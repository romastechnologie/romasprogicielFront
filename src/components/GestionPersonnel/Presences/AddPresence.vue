<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing form theme-form">
      <div class="card rounded rounded-4 px-2 pt-4 py-4 overflow-auto">
        <div class="row">
          <div class="col-md-12 mb-md-25">
            <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
              <div class="row">
                <div class="border border-primary mb-10">
                  <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                    style="background-color: #0a59a4">
                    <div class="col-md-7">
                      <h3 class="fs-4 text-white">
                        Les présences du jours
                      </h3>
                    </div>
                  </div>
                  <div>
                    <div class="row d-flex align-items-center justify-content-between mt-2">
                      <div class="col-md-2">
                        <label class="d-block text-black fw-semibold">
                          Personnel
                          <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div class="col-md-2">
                        <label class="d-block text-black fw-semibold">
                          Heure reglementaire
                          <span class="text-danger">*</span>
                        </label>
                      </div>

                      <div class="col-md-2">
                        <label class="d-block text-black fw-semibold">
                          Heure d'arrivée
                          <span class="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    <hr class="mt-0" />
                    <!--<div class="row" v-for="(horaire, index) in horaires" :key="index">
                      <div class="col-md-2 mb-2">
                        <div class="form-group ">
                          <input :disabled="horaire.estActif == '0'" readonly
                            class="form-control shadow-none fs-md-15 text-black" type="text" v-model="horaire.jour"/>
                        </div>
                      </div>
                      <div class="col-md-2 mb-2">
                        <div class="form-group ">
                          <input :disabled="horaire.estActif == '0'" v-model="horaire.heureOuverture" type="time"
                            :class="valideteRowHoraire(horaire.heureOuverture, horaire.estActif) ? 'is-invalid' : ''"
                            class="form-control shadow-none fs-md-15 text-black" placeholder="Saisir le nom" />
                          <div class="invalid-feedback"
                            v-if="valideteRowHoraire(horaire.heureOuverture, horaire.estActif)">
                            Champs obligatoire.
                          </div>
                        </div>
                      </div>
                    </div>-->
                  </div>
                </div>
                <!--<div class="col-md-12 mt-3">
                  <label for="nobreheuresTravail" class="form-label">Heures de travail<span
                      class="text-danger">*</span></label>
                  <input readonly v-model="contrat.nobreheuresTravail" class="form-control" type="number" />
                  <span class="invalid-feedback"></span>
                </div>-->
              </div>
            </div>
          </div>
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
    date: yup.date().required("La date est obligatoire."),
    heureArrivee: yup.string().required("L'heure d'arrivée est obligatoire."),
    heureDepart: yup.string().required("L'heure de départ est obligatoire."),
    statut: yup.string().required("Le statut est obligatoire."),
    duree: yup.string().required("La durée est obligatoire."),
    statutJustifie: yup.string().required("La justification du statut est obligatoire."),
  })
}
const getAllPersonnels = async()=>{
  try{
    const response  = await ApiService.get("/tout/personnels");
    personnels.value = response.data.data.data;
    console.log("response personnel ",response)
  }catch(error){
    console.error('Erreur lors de récupération des personnels:', error);
    //throw error;
  }
}
async function sendPresence() {

  // try {
  //   const response = await ApiService.post(`/personnels`, presences);
  //   Swal.fire({
  //     timer: 1500,
  //     position: "top-end",
  //     text: "Presence ajouté avec succès!",
  //     icon: "success"
  //   });
  //   router.push("/presences/liste-presence")
  // } catch (error) {
  //   console.error('Erreur lors de la création du presence:', error);
  //   throw error;
  // }
}

const getAllPersonnelConges = async () => {
  try {
    const response = await ApiService.get('/personnelConges');
    conges.value = response.data;

  } catch (error) {
    console.error('Erreur lors de la récupération des congés:', error);
    //throw error;
  }
}

onMounted(() => {
  //getAllPersonnelConges();
  getAllPersonnels();
})
</script>

<style></style>