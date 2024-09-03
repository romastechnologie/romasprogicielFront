<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form @submit="sendPermission" :validation-schema="schemaPermission()">
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de la demande <span class="text-danger">*</span>
              </label>
              <Field name="dateDemande" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateDemande" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Demandes <span class="text-danger">*</span>
              </label>
              <Field name="demande" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="demandeOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner la demande" label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="demande" class="text-danger" />
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
                Motif de la permission <span class="text-danger">*</span>
              </label>
              <Field name="motif" type="text" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="motif" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de début <span class="text-danger">*</span>
              </label>
              <Field name="dateDebut" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateDebut" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de fin <span class="text-danger">*</span>
              </label>
              <Field name="dateFin" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateFin" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de Reprise <span class="text-danger">*</span>
              </label>
              <Field name="dateReprise" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateReprise" class="text-danger" />
            </div>
          </div>

          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Accorder
              </button>
              <router-link to="/permissionps/liste-permissionp" class=" btn btn-danger"><i
                  class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
            </div>
          </div>
        </div>
      </Form>
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
import Multiselect from '@vueform/multiselect/src/Multiselect';


const router = useRouter()

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: false,
});

const personnels = ref([] as any[]);
const demande = ref([] as any[]);
const personnelOptions = ref();
const demandeOptions = ref();

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
      return entryDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10) && entry.categorie.libelle === "Permission" && entry.statut === "Acceptée" && entry.permission === null;
    }
  });

  filterDemande.value = demandeOnSelectedDate;
}

// ----------------------------------------- SCHEMA -----------------------------------------

function schemaPermission() {
  return yup.object().shape({
    motif: yup.string().required("Le motif est obligatoire."),
    dateDemande: yup.string().required("La date de la demande est obligatoire."),
    dateDebut: yup.string().required("La date de début est obligatoire."),
    dateFin: yup.string().required("La date de fin est obligatoire."),
    dateReprise: yup.string().required("La date de reprise est obligatoire."),
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
    router.push("/permissionps/liste-permissionp")
  } catch (error) {
    console.error('Erreur lors de la création de la permission:', error);
    throw error;
  }
}

// --------------------------------------------------- GET ---------------------------------------

/*const getAllDemande = async () => {
  try {
    const response = await ApiService.get('/demandes');
    demande.value = response.data;
    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la recupération des demandes:', error);
    throw error;
  }
}*/

/*const getAllPersonnel = async () => {
  try {
    const response = await ApiService.get('/personnels');
    personnels.value = response.data;

    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la recupération des personnels:', error);
    throw error;
  }
}*/
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


const getAllDemandes = async () => {
  try {
    const response = await ApiService.get('/demandes');
    const demandesData = response.data;
    console.log('Data', demandesData)
    demandeOptions.value = demandesData.map((demande) => ({
      value: demande.id,
      label: demande.personnel.nom + " " + demande.personnel.prenom,
    }));
  }
  catch (error) {
    //error(response.data.message)
  }
}


onMounted(() => {
  getAllDemandes();
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