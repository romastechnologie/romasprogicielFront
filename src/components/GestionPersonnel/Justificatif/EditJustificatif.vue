<template>
     <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form @submit="editJustificatif" :validation-schema="schemaJustificatif()">
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

        <div class="col-md-12 mb-3">
  <div class="form-group mb-15 mb-sm-20 mb-md-25">
    <label class="d-block text-black fw-semibold mb-10">
      Justificatif <span class="text-danger">*</span>
    </label>
    <Field name="justificatif" as="textarea" class="form-control shadow-none fs-md-15 text-black" rows="5" placeholder="Écrire une justification ici..." />
    <ErrorMessage name="justificatif" class="text-danger" />
  </div>
</div>

        <div class="col-md-12 mt-3">
          <div class="d-flex align-items-center ">
            <button class="btn btn-success me-3" type="submit">
              Modifier un justificatif
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
  </template>
  
  <script setup lang="ts">
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import { configure } from 'vee-validate'
  import { useRouter, useRoute } from 'vue-router';
  import Swal from 'sweetalert2';
  import axios from 'axios';
import ApiService from '@/services/ApiService';
import { ref, onMounted, watch } from 'vue';
import Multiselect from '@vueform/multiselect/src/Multiselect';

  
  const router = useRouter()
  const route = useRoute()
  
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: false,
  });
  
const personnelOptions = ref();
const presenceOptions = ref();
  // ------------------------------------------------ SCHEMA -------------------------------------------------
  
  function schemaJustificatif() {
    return yup.object().shape({
      dateDebutJustificatif: yup.date().required("La date de début est obligatoire."),
      dateFinJustificatif: yup.date().required("La date de fin est obligatoire."),
      fileJustificatif: yup.string().required("La preuve est obligatoire."),
    })
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

onMounted(() => {
        getAllJustificatifs();
        getAllPersonnels();
        getAllPresences();
      });

  // ------------------------------------------------ UPDATE -------------------------------------------------
  
  async function updateJustificatif() {
  
    const formData = new FormData();
    
  
    const target = document.getElementById("fileJustificatif") as HTMLInputElement;
    const dateDebutJustificatif = document.getElementById("dateDebutJustificatif") as HTMLInputElement;
    const dateFinJustificatif = document.getElementById("dateFinJustificatif") as HTMLInputElement;
  
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
          const response = await ApiService.put(`/justificatifs/${route.params.id}`, formData);
          Swal.fire({
            timer: 1500,
            position: "top-end",
            text: "Le justificatif a été modifié avec succès!",
            icon: "success"
          });
          router.push("/justificatifs/liste-justificatif")
        } catch (error) {
          console.error('Erreur lors de l\'envoie du justificatif:', error);
          throw error;
        }
      }
    }
  }
  
  </script>
  
  <style></style>