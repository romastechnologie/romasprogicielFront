<template>
    <div class="p-5">
      <div class="card px-2 pt-3 pb-1">
        <div class="row gx-3 flex-wrap">
          <div class="col-6">
            <div class="" id="justificatif" >
      <div class="">
        <div class="">
          <div class="">
            <h5 class="" id="staticBackdropLabel"> Déposer un justificatif </h5>
          </div>
          <div class="modal-body">
            <Form @submit="sendJustificatif" :validation-schema="schemaJustificatif()">
              <p class="my-0"> Date de la présence </p>
              <Field type="date" name="dateJustificatif" id="dateJustificatif" class="form-control mb-1"
                @input="sortPresenceWithDate($event.target)" />
              <ErrorMessage name="dateJustificatif" class="text-danger text-start mb-2" />
              <p class="my-0"> Presence </p>
              <select name="presenceJustificatif" id="presenceJustificatif" class="form-select mb-1">
                <option disabled selected> Choisir la presence </option>
                <option :value="presence.id" v-for="presence in filterPresence" :key="presence.id"> Presence ==> {{
                  presence.personnel.nom + " " + presence.personnel.prenom }} </option>
              </select>
              <p class="my-0"> Personnel </p>
              <select name="personnelJustificatif" id="personnelJustificatif" class="form-select mb-1">
                <option disabled selected> Choisir le personnel </option>
                <option :value=personnel.id v-for="personnel in $store.state.personnels" :key="personnel.id"> {{
                  personnel.nom + " " + personnel.prenom }} </option>
              </select>
              <p class="my-0"> Date de debut </p>
              <Field type="date" name="dateDebutJustificatif" id="dateDebutJustificatif" class="form-control mb-1 " />
              <ErrorMessage name="dateDebutJustificatif" class="text-danger text-start mb-2" />
              <p class="my-0"> Date de Fin </p>
              <Field type="date" name="dateFinJustificatif" id="dateFinJustificatif" class="form-control mb-1" />
              <ErrorMessage name="dateFinJustificatif" class="text-danger text-start mb-2" />
              <p class="my-0"> Preuve </p>
              <Field type="file" name="fileJustificatif" id="fileJustificatif" class="form-control mb-1" />
              <ErrorMessage name="fileJustificatif" class="text-danger text-start mb-2" />
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="submit" class="btn btn-primary"> Déposer </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
          </div>

        </div>
      </div>
    </div>
  
    <!-- Modal -->
    
    <!-- Justificatif -->
    
    
  </template>
  
  <script setup lang="ts">
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import { configure } from 'vee-validate'
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  import $store from '@/store';
  import Swal from 'sweetalert2'
  import { useRouter } from 'vue-router';
  import { createPersonnel } from '@/models/Personnel'
  
  const router = useRouter()
  
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: false,
  });
  
  const changeConge = ref(true);
  const selectAll = ref<boolean>(true);
  const selectedPersonnels = ref<number[]>([])
  
  watch(selectAll, (newSelectAll) => {
  
    if (!newSelectAll) {
      // si le checkbox tout déselectionner
      personnelConges.personnelConge = [];
      selectedPersonnels.value = [];
    } else {
      // sinon
      selectedPersonnels.value = personnels.value.map(personnel => personnel.id);
  
      personnelConges.personnelConge = personnels.value.map((personnel) => ({
        personnel: personnel.id,
        conge: 0,
        statut: "Confirmé",
        dateDebut: "",
        dateFinPrevu: "",
        dateFin: "",
        dateReprise: "",
      }));
    }
  });
  
  const admin = ref(window.localStorage.getItem("adminOnline"));
  
  const closeHeureSupModal = ref(null);
  const closeDemandeModal = ref(null);
  const closePersonnelModal = ref(null);
  const closeJustificatifModal = ref(null);
  const closePresenceModal = ref(null);
  const closeCongeModal = ref(null);
  const closePermissionModal = ref(null);
  const today = ref('');
  const defaultDate = new Date().toISOString().slice(0, 10);
  
  const personnels = ref([] as any[]);
  const presences = ref([] as any[]);
  const demande = ref([] as any[]);
  const conges = ref([] as any[]);
  const personnelsEnConge = ref<number[]>([]);
  const enConge = ref([] as any[]);
  
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const dateDebut = ref(formatDate(new Date()));
  const dateFinPrevu = ref(formatDate(new Date()));
  const dateFin = ref("");
  const dateReprise = ref(formatDate(new Date()));
  
  function updateCurrentPersonnel(event: any) {
    const selectedDemandeId = event.value;
    const selectedDemande = demande.value.find(demande => demande.id == selectedDemandeId);
    selectedDemande ? personnelCongeDemande.value.personnelConge = {
      personnel: selectedDemande.personnel.id,
      conge: 0,
      statut: "Confirmé",
      dateDebut: dateDebut.value,
      dateFinPrevu: dateFinPrevu.value,
      dateFin: dateFin.value,
      dateReprise: dateReprise.value,
    } : null;
  }
  
  function updateBeneficiaireList(id: number) {
    const personnelIndex = personnelConges.personnelConge.findIndex(item => item.personnel === id);
  
    if (personnelIndex !== -1) {
      personnelConges.personnelConge.splice(personnelIndex, 1); // Retirer l'élément de la liste
    } else {
      personnelConges.personnelConge.push({
        personnel: id,
        conge: 0,
        statut: "Confirmé",
        dateDebut: dateDebut.value,
        dateFinPrevu: dateFinPrevu.value,
        dateFin: dateFin.value,
        dateReprise: dateReprise.value,
      });
    }
  }
  
  interface Conge {
    type: number;
    demande: number;
  }
  
  interface PersonnelConge {
    conge: Conge;
    personnelConge: Array<{
      personnel: number;
      conge: number;
      statut: string;
      dateDebut: string;
      dateFinPrevu: string;
      dateReprise: string;
      dateFin: string;
    }>;
  }
  
  interface PersonnelCongeDemande {
    conge: Conge;
    personnelConge: {
      personnel: number;
      conge: number;
      statut: string;
      dateDebut: string;
      dateFinPrevu: string;
      dateReprise: string;
      dateFin: string;
    };
  }
  
  const personnelConges: PersonnelConge = {
    conge: {
      demande: 0,
      type: 0
    },
    personnelConge: []
  }
  
  const personnelCongeDemande = ref<PersonnelCongeDemande>({
    conge: {
      demande: 0,
      type: 0
    },
    personnelConge: {
      personnel: 0,
      conge: 0,
      statut: "Confirmé",
      dateDebut: dateDebut.value, 
      dateFinPrevu: dateFinPrevu.value,
      dateFin: dateFin.value,
      dateReprise: dateReprise.value,
    }
  })
  
  // const conge = ref<Conge>({
  //   dateDebut: "",
  //   dateFinPrevu: "",
  //   dateReprise: "",
  //   demande: 0,
  //   type: 0
  // })
  
  let filterPresence = ref([] as any[]);
  let filterDemande = ref([] as any[]);
  
  function sortPresenceWithDate(choseedDate: HTMLInputElement) {
  
    if (presences.value) {
      const presenceOnSelectedDate = presences.value.filter(entry => {
        const entryDate = new Date(entry.date);
        const selectedDate = new Date(choseedDate.value);
        return entryDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10) && entry.statutJustifie === "Non";
      });
  
      filterPresence.value = presenceOnSelectedDate;
    }
  }
  
  // function sortPresenceForJustificatifWithDate(choseedDate: HTMLInputElement) {
  
  // if (presences.value) {
  //   const presenceOnSelectedDate = presences.value.filter(entry => {
  //     const entryDate = new Date(entry.date);
  //     const selectedDate = new Date(choseedDate.value);
  //     return entryDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10) && entry.statutJustifie === "Non";
  //   });
  
  //   filterPresence.value = presenceOnSelectedDate;
  // }
  // }
  
  function sortDemandeCongeWithDate(choseedDate: HTMLInputElement) {
  
    const demandeOnSelectedDate = demande.value.filter(entry => {
      const entryDate = new Date(entry.create_at);
      const selectedDate = new Date(choseedDate.value);
      if (entry.categorie) {
        return (entryDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10) && entry.categorie.libelle === "Congé" && entry.statut === "Acceptée" && entry.conge === null);
      }
    });
  
    filterDemande.value = demandeOnSelectedDate;
  }
  
  function sortDemandePermissionWithDate(choseedDate: HTMLInputElement) {
  
    const demandeOnSelectedDate = demande.value.filter(entry => {
      const entryDate = new Date(entry.create_at);
      const selectedDate = new Date(choseedDate.value);
      if (entry.categorie) {
        return entryDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10) && entry.categorie.libelle === "Permission" && entry.statut === "Acceptée" && entry.conge === null;
      }
    });
  
    filterDemande.value = demandeOnSelectedDate;
  }
  
  // ----------------------------------------- SCHEMA -----------------------------------------
  function schemaDemande() {
    return yup.object().shape({
      categorieId: yup.string().required("La catégorie est requise."),
      personnelId: yup.string().required("Le personnel est requis."),
      demandeFile: yup.string().required("Le fichier de la demande est requis."),
    })
  }
  
  function schemaPresence() {
    return yup.object().shape({
      presenceDate: yup.date().required("La date est requise."),
      // presencePersonnelId: yup.string().required("Le personnel est requise."),
      heureArrivee: yup.string().required("L'heure d'arrivée est requise."),
      heureDepart: yup.string().required("L'heure de départ est requise."),
      // presenceStatut: yup.string().required("Le statut est requis."),
      duree: yup.string().required("La durée est requise."),
      // statutJustifie: yup.string().required("La justification du statut est requise."),
    })
  }
  
  function schemaJustificatif() {
    return yup.object().shape({
      dateJustificatif: yup.string().required("La date de la presence est requise."),
      // presenceJustificatif: yup.string().required("La presence est requise."),
      // personnelJustificatif: yup.string().required("Le personnel est requis."),
      dateDebutJustificatif: yup.string().required("La date de début est requise."),
      dateFinJustificatif: yup.string().required("La date de fin est requise."),
      fileJustificatif: yup.string().required("La preuve est requise."),
    })
  }
  
  function schemaHeureSup() {
    return yup.object().shape({
      date: yup.string().required("La date est requise."),
      // personnel: yup.string().required("Le personnel est requis."),
      duree: yup.string().required("La durrée est requise."),
    })
  }
  
  function schemaPersonnel() {
    return yup.object().shape({
      nom: yup.string().required("Le nom est requis."),
      prenom: yup.string().required("Le prenom est requis."),
      birthdate: yup.string().required("La date d'anniversaire est requise."),
      email: yup.string().email("L'adresse e-mail n'est pas valide.").required("L'adresse e-mail est requise."),
      telephone: yup.string().required("Le numéro de telephone est requis."),
      dateEmbauche: yup.string().required("La date d'embauche est requise."),
    })
  }
  
  function schemaCongeDemande() {
    return yup.object().shape({
      dateDemande: yup.string().required("La date de la demande est requise."),
      dateDebut: yup.string().required("La date de début est requise."),
      dateFinPrevu: yup.string().required("La date de fin est requise."),
      dateReprise: yup.string().required("La date de reprise est requise."),
    })
  }
  
  function schemaCongeNDemande() {
    return yup.object().shape({
      dateDebut: yup.string().required("La date de débu est requise."),
      dateFinPrevu: yup.string().required("La date de fin est requise."),
      dateReprise: yup.string().required("La date de reprise est requise."),
    })
  }
  
  function schemaPermission() {
    return yup.object().shape({
      motif: yup.string().required("Le motif est requis."),
      dateDemande: yup.string().required("La date de la demande est requise."),
      dateDebut: yup.string().required("La date de début est requise."),
      dateFin: yup.string().required("La date de fin est requise."),
      dateReprise: yup.string().required("La date de reprise est requise."),
    })
  }
  
  // --------------------------------------- SEND FORMULAIRE ------------------------------------
  
  async function sendDemande() {
  
    const formData = new FormData();
  
    const target = document.getElementById("demandeFile") as HTMLInputElement;
    const personnelId = document.getElementById("personnelId") as HTMLInputElement;
    const categorieId = document.getElementById("categorieId") as HTMLInputElement;
  
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      if (file && file.size > 1048576) {
        Swal.fire({
          title: "Oops...!",
          text: "La taille du fichier dépasse 1 Mo!",
          icon: "error"
        });
      } else {
        formData.append('fichier', target.files[0])
        try {
          const response = await axios.post(`http://localhost:3000/demandes/${personnelId.value}/${categorieId.value}`, formData);
          Swal.fire({
            timer: 1500,
            position: "top-end",
  
            text: "La demande a été soumise avec succès!",
            icon: "success"
          });
          $store.commit('ADD_DEMANDE', response.data);
          if (closeDemandeModal.value) {
            (closeDemandeModal.value as HTMLButtonElement).click();
          }
        } catch (error) {
          console.error('Erreur lors de l\'envoie de la demande:', error);
          throw error;
        }
      }
    }
  }
  
  async function sendPresence(value: object) {
  
    const personnelId = document.getElementById("presencePersonnelId") as HTMLInputElement;
    const presenceStatut = document.getElementById("presenceStatut") as HTMLInputElement;
    const statutJustifie = document.getElementById("statutJustifie") as HTMLInputElement;
    const presenceDate = document.getElementById("presenceDate") as HTMLInputElement;
  
    Object.assign(value, {
      statut: presenceStatut.value,
      statutJustifie: statutJustifie.value,
      date: presenceDate.value
    })
  
    try {
      const response = await axios.post(`http://localhost:3000/presences/${personnelId.value}`, value);
      Swal.fire({
        timer: 1500,
        position: "top-end",
  
        text: "Presence ajouté avec succès!",
        icon: "success"
      });
      $store.commit('ADD_PRESENCE', response.data);
      if (closePresenceModal.value) {
        (closePresenceModal.value as HTMLButtonElement).click();
      }
    } catch (error) {
      console.error('Erreur lors de la création du presence:', error);
      throw error;
    }
  }
  
  async function sendJustificatif() {
    // alert(JSON.stringify(value, null, 2));
  
    const formData = new FormData();
  
    const target = document.getElementById("fileJustificatif") as HTMLInputElement;
    const dateDebutJustificatif = document.getElementById("dateDebutJustificatif") as HTMLInputElement;
    const dateFinJustificatif = document.getElementById("dateFinJustificatif") as HTMLInputElement;
    const personnelId = document.getElementById("personnelJustificatif") as HTMLInputElement;
    const presenceId = document.getElementById("presenceJustificatif") as HTMLInputElement;
  
    if (dateDebutJustificatif.value <= dateFinJustificatif.value) {
  
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        if (file && file.size > 1048576) {
          Swal.fire({
            title: "Oops...!",
            text: "La taille du fichier dépasse 1 Mo!",
            icon: "error"
          });
        } else {
  
          formData.append("dateDebut", (dateDebutJustificatif.value as string).toString().slice(0, 10))
          formData.append("dateFin", (dateFinJustificatif.value as string).toString().slice(0, 10))
          formData.append('fichier', target.files[0])
  
          try {
            const response = await axios.post(`http://localhost:3000/justificatifs/${personnelId.value}/${presenceId.value}`, formData);
            Swal.fire({
              timer: 1500,
              position: "top-end",
  
              text: "Le justificatifs a été envoyé avec succès!",
              icon: "success"
            });
            // $store.commit('ADD_DEMANDE', response.data);
            router.push("/")
            if (closeJustificatifModal.value) {
              (closeJustificatifModal.value as HTMLButtonElement).click();
            }
          } catch (error) {
            console.error('Erreur lors de l\'envoie de la demande:', error);
            throw error;
          }
        }
      }
  
    } else {
      Swal.fire("la date de début est inférieure à la date de fin.", "", "error");
    }
  
  }
  
  async function sendHeureSup(value: object) {
  
    const personnelId = document.getElementById("heureSupPersonnelId") as HTMLInputElement;
  
    try {
      const response = await axios.post(`http://localhost:3000/heureSups/${personnelId.value}`, value);
      Swal.fire({
        timer: 1500,
        position: "top-end",
        text: "Heure supplémentaire ajoutée avec succès!",
        icon: "success"
      });
      $store.commit('ADD_HEURESUP', response.data);
      if (closeHeureSupModal.value) {
        (closeHeureSupModal.value as HTMLButtonElement).click();
      }
    } catch (error) {
      console.error('Erreur lors de la création due l\'heure supplementaire:', error);
      throw error;
    }
  }
  
  async function sendPersonnel(value: object) {
    createPersonnel(value)
  }
  
  async function sendCongeDemande() {
  
  
    const dateDebut = document.getElementById("dateDebut") as HTMLInputElement;
    const dateFin = document.getElementById("dateFinPrevu") as HTMLInputElement;
    const dateReprise = document.getElementById("dateReprise") as HTMLInputElement;
  
    if (dateDebut.value <= dateFin.value && dateFin.value <= dateReprise.value) {
  
      try {
        const response = await axios.post(`http://localhost:3000/personnelConges/1`, personnelCongeDemande.value);
        Swal.fire({
          timer: 1500,
          position: "top-end",
          text: "Congé ajoutée avec succès!",
          icon: "success"
        });
        $store.commit('ADD_CONGE', response.data);
        if (closeCongeModal.value) {
          (closeCongeModal.value as HTMLButtonElement).click();
        }
        router.push("/")
      } catch (error) {
        console.error('Erreur lors de la création du congé:', error);
        throw error;
      }
  
    } else {
      Swal.fire("la date de début est inférieure à la date de fin ou inferieur à la date de reprise.", "", "error");
    }
  
  }
  
  async function sendCongeNDemande() {
  
    const dateDebut = document.getElementById("dateDebut") as HTMLInputElement;
    const dateFin = document.getElementById("dateFinPrevu") as HTMLInputElement;
    const dateReprise = document.getElementById("dateReprise") as HTMLInputElement;
  
    if (dateDebut.value <= dateFin.value && dateFin.value <= dateReprise.value) {
      try {
        const response = await axios.post(`http://localhost:3000/personnelConges`, personnelConges);
        Swal.fire({
          timer: 1500,
          position: "top-end",
          text: "Congé ajoutée avec succès!",
          icon: "success"
        });
        $store.commit('ADD_CONGE', response.data);
        if (closeCongeModal.value) {
          (closeCongeModal.value as HTMLButtonElement).click();
        }
        router.push("/")
      } catch (error) {
        console.error('Erreur lors de la création du congé:', error);
        throw error;
      }
    } else {
      Swal.fire("la date de début est inférieure à la date de fin ou inferieur à la date de reprise.", "", "error");
    }
  
  }
  
  async function sendPermission(value: object) {
  
    const personnelId = document.getElementById("permissionPersonnelId") as HTMLInputElement;
    const demandeId = document.getElementById("permissionDemandeId") as HTMLInputElement;
  
    try {
      const response = await axios.post(`http://localhost:3000/permissions/${personnelId.value}/${demandeId.value}`, value);
      Swal.fire({
        timer: 1500,
        position: "top-end",
  
        text: "Permission ajoutée avec succès!",
        icon: "success"
      });
      $store.commit('ADD_PERMISSION', response.data);
      if (closePermissionModal.value) {
        (closePermissionModal.value as HTMLButtonElement).click();
      }
      router.push("/")
    } catch (error) {
      console.error('Erreur lors de la création de la permission:', error);
      throw error;
    }
  }
  
  // --------------------------------------------------- GET ---------------------------------------
  const getAllPresences = async () => {
    try {
      const response = await axios.get('http://localhost:3000/presences');
      presences.value = response.data;
      // router.push("/");
      console.log(response);
    } catch (error) {
      console.error('Erreur lors de la recupération des présences:', error);
      throw error;
    }
  }
  
  const getAllDemande = async () => {
    try {
      const response = await axios.get('http://localhost:3000/demandes');
      demande.value = response.data;
  
    } catch (error) {
      console.error('Erreur lors de la recupération des demandes:', error);
      throw error;
    }
  }
  
  const getAllPersonnel = async () => {
    try {
      const response = await axios.get('http://localhost:3000/personnels');
      personnels.value = response.data;
  
      const allPersonnelIds = response.data.map((personnel: any) => personnel.id);
      const personnelsPasEnCongeIds = allPersonnelIds.filter((id: any) => !personnelsEnConge.value.includes(id));
      selectedPersonnels.value = personnelsPasEnCongeIds;
  
      enConge.value = response.data.filter((personnel: any) => personnelsPasEnCongeIds.includes(personnel.id));
  
      personnelConges.personnelConge = response.data.map((personnel: any) => ({
        personnel: personnel.id,
        conge: 0,
        statut: "Confirmé",
        dateDebut: dateDebut.value,
        dateFinPrevu: dateFinPrevu.value,
        dateFin: dateFin.value,
        dateReprise: dateReprise.value,
      }));
  
      console.log(response);
    } catch (error) {
      console.error('Erreur lors de la recupération des personnels:', error);
      throw error;
    }
  }
  
  const getAllPersonnelConges = async () => {
    try {
      const response = await axios.get('http://localhost:3000/personnelConges');
  
      const congesActuels = response.data.filter((conge: any) => {
        const dateDebut = new Date(conge.dateDebut);
        const dateFin = new Date(conge.dateFinPrevu);
        dateFin.setDate(dateFin.getDate() + 1);
  
        const currentDate = new Date();
  
        return dateDebut <= currentDate && currentDate <= dateFin;
      });
  
      personnelsEnConge.value = congesActuels.map((conge: any) => conge.personnel.id);
  
      for (let index = 0; index < personnelsEnConge.value.length; index++) {
        console.log(personnelsEnConge.value[index])
      }
  
    } catch (error) {
      console.error('Erreur lors de la récupération des congés:', error);
      throw error;
    }
  }
  
  
  onMounted(() => {
  
    const dateObj = new Date();
    today.value = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
    getAllPresences();
    getAllDemande();
    getAllPersonnelConges();
    getAllPersonnel();
  })
  
  </script>
  
  <style>
  a {
    font-weight: bold;
    color: #00247E;
    text-decoration: none;
  
    &.router-link-exact-active {
      color: white;
      background-color: #00247E
    }
  }
  </style>