<template>
  <div class="p-5">
    <div class="card px-2 pt-3 pb-1">
      <div class="row gx-3 flex-wrap">
        <div class="col-6">
          <div class="" id="permission">
            <div class="">
              <div class="">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel"> Accorder une permission </h5>
                </div>
                <div class="modal-body">
                  <Form @submit="sendPermission" :validation-schema="schemaPermission()">
                    <p class="my-0"> Date de la demande </p>
                    <Field type="date" name="dateDemande" id="dateDemande" class="form-control mb-1"
                      @input="sortDemandePermissionWithDate($event.target)" />
                    <ErrorMessage name="dateDemande" class="text-danger text-start mb-2" />
                    <p class="my-0"> Demande </p>
                    <select name="permissionDemandeId" id="permissionDemandeId" class="form-select mb-1">
                      <option disabled selected> Choisir la demande </option>
                      <option :value="demande.id" v-for="demande in filterDemande" :key="demande.id"> Demande ==> {{
                        demande.personnel.nom + " " + demande.personnel.prenom }} </option>
                    </select>
                    <p class="my-0"> Personnel </p>
                    <select name="permissionPersonnelId" id="permissionPersonnelId" class="form-select mb-1">
                      <option disabled selected> Choisir le personnel </option>
                      <option :value=personnel.id v-for="personnel in personnels" :key="personnel.id"> {{
                        personnel.nom + " " + personnel.prenom }} </option>
                    </select>
                    <p class="my-0"> Motif de la permission </p>
                    <Field type="text" name="motif" id="motif" class="form-control mb-1 " />
                    <ErrorMessage name="motif" class="text-danger text-start mb-2" />
                    <p class="my-0"> Date de debut </p>
                    <Field type="date" name="dateDebut" id="dateDebut" class="form-control mb-1 " />
                    <ErrorMessage name="dateDebut" class="text-danger text-start mb-2" />
                    <p class="my-0"> Date de fin </p>
                    <Field type="date" name="dateFin" id="dateFin" class="form-control mb-1" />
                    <ErrorMessage name="dateFin" class="text-danger text-start mb-2" />
                    <p class="my-0"> Date de reprise </p>
                    <Field type="date" name="dateReprise" id="dateReprise" class="form-control mb-1" />
                    <ErrorMessage name="dateReprise" class="text-danger text-start mb-2" />
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                      <button type="submit" class="btn btn-primary"> Accorder </button>
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

  <!-- Permission -->

</template>

<script setup lang="ts">

import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { configure } from 'vee-validate'
import { ref, onMounted, watch } from 'vue';
import DashboardElement from '@/components/DashboardElement.vue'
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

const personnels = ref([] as any[]);
const demande = ref([] as any[]);

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

let filterDemande = ref([] as any[]);

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

async function sendPermission(value: object) {

  const personnelId = document.getElementById("permissionPersonnelId") as HTMLInputElement;
  const demandeId = document.getElementById("permissionDemandeId") as HTMLInputElement;

  try {
    const response = await ApiService.post(`/permissionps/${personnelId.value}/${demandeId.value}`, value);
    Swal.fire({
      timer: 1500,
      position: "top-end",

      text: "Permission ajoutée avec succès!",
      icon: "success"
    });
    router.push("/permissionsp/liste-permissionp")
  } catch (error) {
    console.error('Erreur lors de la création de la permission:', error);
    throw error;
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

const getAllPersonnel = async () => {
  try {
    const response = await ApiService.get('/personnels');
    personnels.value = response.data;

    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la recupération des personnels:', error);
    throw error;
  }
}


onMounted(() => {
  getAllDemande();
  getAllPersonnel();
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