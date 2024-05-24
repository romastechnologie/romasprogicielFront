<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing form theme-form">
      <div class="card rounded rounded-4 px-2 pt-4 py-4 ">
        <div class="d-flex mb-2">
          <div class="col-3 mx-2 text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
            <h6> Date </h6>
          </div>
          <div class="col-4 mx-2 text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
            <h6> Personnel </h6>
          </div>
          <div class="col-2 mx-2 text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
            <h6> Heure d'arrivée </h6>
          </div>
          <div class="col-2 mx-2 text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
            <h6> Heure de depart </h6>
          </div>
          <div class="col-2 mx-2 text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
            <h6> Durée </h6>
          </div>
          <div class="col-3 mx-1 text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
            <h6> Présence </h6>
          </div>
          <div class="col-2 mx-2 text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
            <h6> Statut justifié </h6>
          </div>
          <div class="mx-2 text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
            <h6> </h6>
          </div>
        </div>
        <template v-for="presence in presences" :key="presence.personnel">
          <Form :validation-schema="schemaPresence()" :id="`${presence.personnel}`" class="d-flex mb-2">
            <div class="col-3 mx-2">
              <Field type="date" v-model="presence.date" name="date" id="date" class="form-control mb-1" readonly />
              <ErrorMessage name="date" class="text-danger text-start mb-2" />
            </div>
            <div class="col-4 mx-2">
              <select name="personnel" id="personnel" class="form-select mb-1" disabled>
                <template v-for="personnel in personnels" :key="personnel.id">
                  <option v-if="personnel.id === presence.personnel">
                    {{ personnel.nom + " " + personnel.prenom }} </option>
                </template>
              </select>
            </div>
            <div class="col-2 mx-2">
              <Field
                v-if="presence.statutJustifie == '' || presence.statutJustifie == 'Non' || presence.statutJustifie == 'Oui'"
                v-model="presence.heureArrivee" type="text" name="heureArrivee" id="heureArrivee"
                class="form-control mb-1" />
              <Field v-if="presence.statutJustifie == 'En congé'" readonly v-model="presence.heureArrivee" type="text"
                name="heureArrivee" id="heureArrivee" class="form-control mb-1" />
              <ErrorMessage name="heureArrivee" class="text-danger text-start mb-2" />
            </div>
            <div class="col-2 mx-2">
              <Field
                v-if="presence.statutJustifie == '' || presence.statutJustifie == 'Non' || presence.statutJustifie == 'Oui'"
                v-model="presence.heureDepart" @change="calculateDuration(presence)" type="text" name="heureDepart"
                id="heureDepart" class="form-control mb-1" />
              <Field v-if="presence.statutJustifie == 'En congé'" readonly v-model="presence.heureDepart"
                @change="calculateDuration(presence)" type="text" name="heureDepart" id="heureDepart"
                class="form-control mb-1" />
              <ErrorMessage name="heureDepart" class="text-danger text-start mb-2" />
            </div>
            <div class="col-2 mx-2">
              <Field v-model="presence.duree" type="text" name="duree" id="duree" class="form-control mb-1" readonly />
              <ErrorMessage name="duree" class="text-danger text-start mb-2" />
            </div>
            <div class="col-3 mx-1 d-flex justify-content-center align-items-center">
              <div class="form-check">
                <input
                  v-if="presence.statutJustifie == '' || presence.statutJustifie == 'Non' || presence.statutJustifie == 'Oui'"
                  v-model="presence.statut" class="form-check-input" type="radio" value="present" name="presence"
                  id="present">
                <input v-if="presence.statutJustifie == 'En congé'" disabled v-model="presence.statut"
                  class="form-check-input" type="radio" value="present" name="presence" id="present">
                <label for="present"> Présent </label>
              </div>
              <div class="form-check mx-3">
                <input v-model="presence.statut" class="form-check-input" type="radio" value="absent" name="presence"
                  id="absent">
                <label for="absent"> Absent </label>
              </div>
            </div>
            <div
              v-if="presence.statutJustifie == '' || presence.statutJustifie == 'Non' || presence.statutJustifie == 'Oui'"
              class="col-2 mx-2">
              <select v-model="presence.statutJustifie" name="statutJustifie" id="statutJustifie" class="form-select"
                as="select">
                <option value="Oui"> Oui </option>
                <option value="Non"> Non </option>
              </select>
            </div>
            <div v-else-if="presence.statutJustifie == 'En congé'" class="col-2 mx-2">
              <select disabled v-model="presence.statutJustifie" name="statutJustifie" id="statutJustifie"
                class="form-select" as="select">
                <option value="En congé"> En congé </option>
              </select>
            </div>
          </Form>
        </template>
        <div v-if="filterPersonnel.length == 0" class="fs-5 d-flex justify-content-center">
          La liste est vide
        </div>
        <div>
          <button @click="sendPresence" class="btn btn-primary mx-2"> Envoyer </button>
          <router-link to="/presences/liste-presence">
            <button type="submit" class="btn btn-danger">
              Annuler </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { configure } from 'vee-validate'
import { onMounted, reactive, ref } from 'vue';
import ApiService from '@/services/ApiService';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '@/router';

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: false,
});

interface Presence {
  date: string;
  heureArrivee: string;
  heureDepart: string;
  statut: string;
  duree: string;
  statutJustifie: string;
  personnel: number;
}

const presences = reactive<Presence[]>([]);

const calculateDuration = (presence: Presence) => {
  // Vérifier si les champs contiennent "-"
  if (presence.heureArrivee === "-" || presence.heureDepart === "-") {
    presence.duree = "0"; // Si l'un des champs contient "-", définir la durée sur 0
    return;
  }

  const heureArriveeParts = presence.heureArrivee.split(':').map(Number); // Séparer l'heure et les minutes
  const heureDepartParts = presence.heureDepart.split(':').map(Number); // Séparer l'heure et les minutes

  // Calculer les heures et les minutes pour chaque
  const heureArriveeMinutes = heureArriveeParts[0] * 60 + heureArriveeParts[1];
  const heureDepartMinutes = heureDepartParts[0] * 60 + heureDepartParts[1];

  // Calculer la différence en minutes
  const differenceMinutes = heureDepartMinutes - heureArriveeMinutes;

  // Convertir la différence en heures et minutes
  const hours = Math.floor(differenceMinutes / 60);
  const minutes = differenceMinutes % 60;

  // Formater le résultat en "hh:mm"
  const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  // Mettre à jour la propriété 'duree' avec la durée formatée
  presence.duree = formattedDuration;
}

const personnels = ref([] as any[]);
const conges = ref([] as any[]);
const personnelsEnConge = ref<number[]>([]);
const statutJustifieOptions = ref([] as any[]);
const cate = ref();

let filterPersonnel = ref(personnels);

function sortPersonnelWithSearch(searchDemande: any) {
  if ((searchDemande.value as string).trim() === "") {
    filterPersonnel.value = personnels.value
  } else {
    filterPersonnel.value = personnels.value.filter(personnel => (personnel.nom.toLowerCase()).startsWith((searchDemande.value as string).trim().toLowerCase()))
  }
}

const defaultDate = new Date().toISOString().slice(0, 10);

function schemaPresence() {
  return yup.object().shape({
    date: yup.date().required("La date est requise."),
    heureArrivee: yup.string().required("L'heure d'arrivée est requise."),
    heureDepart: yup.string().required("L'heure de départ est requise."),
    statut: yup.string().required("Le statut est requis."),
    duree: yup.string().required("La durée est requise."),
    statutJustifie: yup.string().required("La justification du statut est requise."),
  })
}

async function sendPresence() {

  try {
    const response = await ApiService.post(`/presences`, presences);
    Swal.fire({
      timer: 1500,
      position: "top-end",
      text: "Presence ajouté avec succès!",
      icon: "success"
    });
    router.push("/presences/liste-presence")
  } catch (error) {
    console.error('Erreur lors de la création du presence:', error);
    throw error;
  }
}

// --------------------------------------------- GET ----------------------------------------------------
const getAllPersonnelConges = async () => {
  try {
    const response = await ApiService.get('/personnelConges');
    conges.value = response.data;

    const congesActuels = conges.value.filter((conge) => {
      const dateDebut = new Date(conge.dateDebut);
      const dateFin = new Date(conge.dateFinPrevu);
      dateFin.setDate(dateFin.getDate() + 1);

      const currentDate = new Date();

      return dateDebut <= currentDate && currentDate <= dateFin;
    });

    personnelsEnConge.value = congesActuels.map((conge) => conge.personnel.id);

    for (let index = 0; index < personnelsEnConge.value.length; index++) {
      console.log(personnelsEnConge.value[index])
    }

    try {
      const response = await ApiService.get('/personnels');
      personnels.value = response.data;

      for (let index = 0; index < personnels.value.length; index++) {
        presences.push(
          {
            date: defaultDate,
            heureArrivee: "",
            heureDepart: "",
            statut: "present",
            duree: "",
            statutJustifie: "",
            personnel: personnels.value[index].id,
          }
        )
      }

      for (const conge of personnelsEnConge.value) {
        const presenceIndex = presences.findIndex(presence => presence.personnel === conge);
        if (presenceIndex !== -1) {
          presences[presenceIndex].heureArrivee = "-";
          presences[presenceIndex].heureDepart = "-";
          presences[presenceIndex].statut = "absent";
          presences[presenceIndex].duree = "0";
          presences[presenceIndex].statutJustifie = "En congé";
        }
      }

      console.log(response);
    } catch (error) {
      console.error('Erreur lors de la recupération des personnels:', error);
      throw error;
    }

  } catch (error) {
    console.error('Erreur lors de la récupération des congés:', error);
    throw error;
  }
}

onMounted(() => {
  getAllPersonnelConges();
})
</script>

<style></style>