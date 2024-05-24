<template>
  <div class="p-5">
    <div v-if="changeConge" class="card rounded-1 p-3 modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-body">
          <!-- <div class="my-3">
            {{ personnelConges }}
          </div> -->
          <div class="d-flex justify-content-center">
            <button class="btn btn-secondary" v-if="changeConge == true" @click="changeConge = false">
              Congé sans demande
            </button>
          </div>
          <Form @submit="sendCongeNDemande" :validation-schema="schemaCongeNDemande()">
            <div class="d-flex justify-content-between">
              <div class="col-6">
                <p class="my-0"> Date de debut </p>
                <Field v-model="dateDebut" type="date" name="dateDebut" id="dateDebut" class="form-control mb-1 " />
                <ErrorMessage name="dateDebut" class="text-danger text-start mb-2" />
                <p class="my-0"> Date de fin prévu </p>
                <Field v-model="dateFinPrevu" type="date" name="dateFinPrevu" id="dateFinPrevu"
                  class="form-control mb-1" />
                <ErrorMessage name="dateFinPrevu" class="text-danger text-start mb-2" />
                <p class="my-0"> Date de reprise </p>
                <Field v-model="dateReprise" type="date" name="dateReprise" id="dateReprise"
                  class="form-control mb-1" />
                <ErrorMessage name="dateReprise" class="text-danger text-start mb-2" />
              </div>
              <div class="col-6">
                <p class="my-0"> Bénéficiaire(s) </p>
                <div class="d-flex flex-wrap overflow-auto">
                  <div class="form-check mx-2">
                    <input class="form-check-input" type="checkbox" v-model="selectAll" id="checkbox_defaut">
                    <label class="form-check-label" for="checkbox_defaut"> Tout </label>
                  </div>
                  <div v-for="personnel in enConge" :key="personnel.id" class="form-check mx-2">
                    <input @change="updateBeneficiaireList(personnel.id)" class="form-check-input personnel-checkbox"
                      type="checkbox" v-model="selectedPersonnels" :value="personnel.id"
                      :id="'checkbox_' + personnel.id">
                    <label class="form-check-label" :for="'checkbox_' + personnel.id">
                      {{ personnel.nom + " " + personnel.prenom }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
              <button type="submit" class="btn btn-primary"> Programmer </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
    <div v-if="!changeConge" class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <div class="my-3">
            {{ personnelCongeDemande }}
          </div> -->
          <h5 class="modal-title" id="staticBackdropLabel"> Programmer un congé </h5>
          <!-- <h5 v-if="!changeConge" class="modal-title" id="staticBackdropLabel"> Accorder un congé </h5> -->
          <button ref="closeCongeModal" type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="my-3">
          </div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-secondary" v-if="changeConge == false" @click="changeConge = true"> Congé avec
              demande </button>
          </div>
          <Form @submit="sendCongeDemande" :validation-schema="schemaCongeDemande()">
            <p class="my-0"> Date de la demande </p>
            <Field type="date" name="dateDemande" id="dateDemande" class="form-control mb-1"
              @input="sortDemandeCongeWithDate($event.target)" />
            <ErrorMessage name="dateDemande" class="text-danger text-start mb-2" />
            <p class="my-0"> Demande </p>
            <select v-model="personnelCongeDemande.conge.demande" name="congeDemandeId" id="congeDemandeId"
              class="form-select mb-1" @change="updateCurrentPersonnel($event.target)">
              <option disabled selected> Choisir la demande </option>
              <option :value="demande.id" v-for="demande in filterDemande" :key="demande.id">
                Demande ==> {{ demande.personnel.nom + " " + demande.personnel.prenom }} </option>
            </select>
            <p class="my-0"> Type de congé </p>
            <select v-model="personnelCongeDemande.conge.type" name="congeId" id="congeTypeId" class="form-select mb-1">
              <option disabled selected> Choisir le type </option>
              <option :value="typeConge.id" v-for="typeConge in typeConges" :key="typeConge.id"> {{
                typeConge.libelle }} </option>
            </select>
            <p class="my-0"> Date de debut </p>
            <Field v-model="personnelCongeDemande.personnelConge.dateDebut" type="date" name="dateDebut" id="dateDebut"
              class="form-control mb-1 " />
            <ErrorMessage name="dateDebut" class="text-danger text-start mb-2" />
            <p class="my-0"> Date de fin prévu </p>
            <Field v-model="personnelCongeDemande.personnelConge.dateFinPrevu" type="date" name="dateFinPrevu"
              id="dateFinPrevu" class="form-control mb-1" />
            <ErrorMessage name="dateFinPrevu" class="text-danger text-start mb-2" />
            <p class="my-0"> Date de reprise </p>
            <Field v-model="personnelCongeDemande.personnelConge.dateReprise" type="date" name="dateReprise"
              id="dateReprise" class="form-control mb-1" />
            <ErrorMessage name="dateReprise" class="text-danger text-start mb-2" />
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
              <button type="submit" class="btn btn-primary"> Programmer </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>

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

const closeDemandeModal = ref(null);
const closeCongeModal = ref(null);

const personnels = ref([] as any[]);
const presences = ref([] as any[]);
const demande = ref([] as any[]);
const conges = ref([] as any[]);
const personnelsEnConge = ref<number[]>([]);
const enConge = ref([] as any[]);
const typeConges = ref([] as any[]);

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


// ----------------------------------------- SCHEMA -----------------------------------------

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

// --------------------------------------- SEND FORMULAIRE ------------------------------------

async function sendCongeDemande() {


  const dateDebut = document.getElementById("dateDebut") as HTMLInputElement;
  const dateFin = document.getElementById("dateFinPrevu") as HTMLInputElement;
  const dateReprise = document.getElementById("dateReprise") as HTMLInputElement;

  if (dateDebut.value <= dateFin.value && dateFin.value <= dateReprise.value) {

    try {
      const response = await ApiService.post(`/personnelConges/1`, personnelCongeDemande.value);
      Swal.fire({
        timer: 1500,
        position: "top-end",
        text: "Congé ajoutée avec succès!",
        icon: "success"
      });
      router.push("/conges/liste-conge")
      if (closeCongeModal.value) {
        (closeCongeModal.value as HTMLButtonElement).click();
      }
      router.push("/conges/liste-conge")
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
      const response = await ApiService.post(`/personnelConges`, personnelConges);
      Swal.fire({
        timer: 1500,
        position: "top-end",
        text: "Congé ajoutée avec succès!",
        icon: "success"
      });
      router.push("/conges/liste-conge")
      if (closeCongeModal.value) {
        (closeCongeModal.value as HTMLButtonElement).click();
      }
      router.push("/conges/liste-conge")
    } catch (error) {
      console.error('Erreur lors de la création du congé:', error);
      throw error;
    }
  } else {
    Swal.fire("la date de début est inférieure à la date de fin ou inferieur à la date de reprise.", "", "error");
  }

}

// --------------------------------------------------- GET ---------------------------------------
const getAllPresences = async () => {
  try {
    const response = await ApiService.get('/presences');
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
    const response = await ApiService.get('/demandes');
    demande.value = response.data;

  } catch (error) {
    console.error('Erreur lors de la recupération des demandes:', error);
    throw error;
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

const getAllPersonnelConges = async () => {
  try {
    const response = await ApiService.get('/personnelConges');

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

  getAllPresences();
  getAllDemande();
  getAllPersonnelConges();
  getAllPersonnel();
})
</script>

<style>
a {
  font-weight: bold;
  text-decoration: none;
  color: white;

  &.router-link-exact-active {
    color: white;
    background-color: #7A70BA
  }

  &.router-link-exact-active:hover {
    color: white;
  }
}

</style>