<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form @submit="sendJustificatif" :validation-schema="schemaJustificatif()">
        <div class="row">
        <div class="col-md-4 mb-3">
          <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="d-block text-black fw-semibold mb-10">
              Date <span class="text-danger">*</span>
            </label>
            <Field name="date" type="date" class="form-control shadow-none fs-md-15 text-black" />
            <ErrorMessage name="date" class="text-danger" />
          </div>
        </div>

        <!--<p class="my-0"> Presence </p>
        <select name="presenceJustificatif" id="presenceJustificatif" class="form-select mb-1">
          <option disabled selected> Choisir la presence </option>
          <option :value="presence.id" v-for="presence in filterPresence" :key="presence.id"> Presence ==>
            {{
        presence.personnel.nom + " " + presence.personnel.prenom }} </option>
        </select>-->

        <div class="col-md-4 mb-3">
          <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="d-block text-black mb-10">
              Présence <span class="text-danger">*</span>
            </label>
            <Field name="presenceJustificatif" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="presenceOptions" :preserve-search="true"
                :multiple="false" :searchable="true" placeholder="Sélectionner la présence" label="label"
                track-by="label" />
            </Field>
            <ErrorMessage name="presenceJustificatif" class="text-danger" />
          </div>
        </div>

       
        <div class="col-md-4 mb-3">
          <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="d-block text-black mb-10">
              Personnel <span class="text-danger">*</span>
            </label>
            <Field name="personnel" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="personnelOptions" :preserve-search="true"
                :multiple="false" :searchable="true" placeholder="Sélectionner le personnel" label="label"
                track-by="label" />
            </Field>
            <ErrorMessage name="personnel" class="text-danger" />
          </div>
        </div>


        <div class="col-md-4 mb-3">
          <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="d-block text-black fw-semibold mb-10">
              Date de début <span class="text-danger">*</span>
            </label>
            <Field name="dateDebutJustificatif" type="date" class="form-control shadow-none fs-md-15 text-black" />
            <ErrorMessage name="dateDebutJustificatif" class="text-danger" />
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="d-block text-black fw-semibold mb-10">
              Date de fin <span class="text-danger">*</span>
            </label>
            <Field name="dateFinJustificatif" type="date" class="form-control shadow-none fs-md-15 text-black" />
            <ErrorMessage name="dateFinJustificatif" class="text-danger" />
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="d-block text-black fw-semibold mb-10">
              Preuve <span class="text-danger">*</span>
            </label>
            <Field name="fileJustificatif" type="file" class="form-control shadow-none fs-md-15 text-black" />
            <ErrorMessage name="fileJustificatif" class="text-danger" />
          </div>
        </div>

        <div class="col-md-12 mt-3">
          <div class="d-flex align-items-center ">
            <button class="btn btn-success me-3" type="submit">
              Ajouter un justificatif
            </button>
            <router-link to="/justificatifs/liste-justificatif" class=" btn btn-danger"><i
                class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Annuler</router-link>
          </div>
        </div>
      </div>
      </Form>
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
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import Multiselect from '@vueform/multiselect/src/Multiselect';


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
const personnelOptions = ref();
const presenceOptions = ref();




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

// --------------------------------------- SEND FORMULAIRE ------------------------------------

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
          const response = await ApiService.post(`/justificatifs/${personnelId.value}/${presenceId.value}`, formData);
          Swal.fire({
            timer: 1500,
            position: "top-end",

            text: "Le justificatifs a été envoyé avec succès!",
            icon: "success"
          });

          router.push("/justificatifs/liste-justificatif")
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

// --------------------------------------------------- GET ---------------------------------------

const getAllDemande = async () => {
  try {
    const response = await ApiService.get('/demandes');
    demande.value = response.data;

  } catch (error) {
    console.error('Erreur lors de la recupération des demandes:', error);
    throw error;
  }
}

const getAllPersonnels = async () => {
  try {
    const response = await ApiService.get('/personnels');
    const personnelsData = response.data;
    console.log('Data', personnelsData)
    personnelOptions.value = personnelsData.map((personnel) => ({
      value: personnel.id,
      label: personnel.nom + " " + personnel.prenom,
    }));
  }
  catch (error) {
    //error(response.data.message)
  }
}

const getAllPresences = async () => {
  try {
    const response = await ApiService.get('/presences');
    const presencesData = response.data;
    console.log('Data', presencesData)
    presenceOptions.value = presencesData.map((presence) => ({
      value: presence.id,
      label: presence.personnel.nom + " " + presence.personnel.prenom,
    }));
  }
  catch (error) {
    //error(response.data.message)
  }
}



const getAllPersonnel = async () => {
  try {
    const response = await ApiService.get('/personnels');
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

onMounted(() => {

  getAllPresences();
  getAllDemande();
  getAllPersonnel();
  getAllPersonnels();
})

</script>

<style>
a {
  font-weight: bold;
  color: white;
  text-decoration: none;

  &.router-link-exact-active {
    color: white;
    background-color: #7A70BA
  }

  &.router-link-exact-active:hover {
    color: white;
  }

}
</style>