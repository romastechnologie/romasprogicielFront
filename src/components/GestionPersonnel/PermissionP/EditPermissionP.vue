<template>
  <div class="p-5 ">
    <h4 class="text-center"> Modifier la permission </h4>
    <template v-for="permission in permissions" :key="permission.id">
      <div v-if="permission.id == $route.params.id" class="card p-2 col-lg-6 col-md-7 mx-auto">
        <Form @submit="updatePermission" :validation-schema="schemaPermission()">
          <p class="my-0"> Motif </p>
          <Field :value="permission.motif" type="text" name="motif" id="motif" class="form-control mb-1 " />
          <p class="my-0"> Date de debut </p>
          <Field type="date" name="dateDebut" id="dateDebut" class="form-control mb-1 " />
          <ErrorMessage name="dateDebut" class="text-danger text-start mb-2" />
          <p class="my-0"> Date de fin </p>
          <Field type="date" name="dateFin" id="dateFin" class="form-control mb-1" />
          <ErrorMessage name="dateFin" class="text-danger text-start mb-2" />
          <p class="my-0"> Date de reprise </p>
          <Field type="date" name="dateReprise" id="dateReprise" class="form-control mb-1" />
          <ErrorMessage name="dateReprise" class="text-danger text-start mb-2" />
          <div>
            <button type="submit" class="btn btn-primary"> Modifier </button>
          </div>
        </Form>
      </div>
    </template>
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
import { onMounted, ref } from 'vue';

const router = useRouter()
const route = useRoute()

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: false,
});

const permissions = ref([] as any[]);

// ------------------------------------------------ SCHEMA -------------------------------------------------

function schemaPermission() {
  return yup.object().shape({
    motif: yup.string().required("Le motif est requis."),
    dateDebut: yup.date().required("La date de début est requise."),
    dateFin: yup.date().required("La date de fin est requise."),
    dateReprise: yup.date().required("La date de reprise est requise."),
  })
}

// ------------------------------------------------ UPDATE -------------------------------------------------

async function updatePermission(value: object) {

  try {
    const response = await ApiService.put(`/permissionps/${route.params.id}`, value);
    Swal.fire({
      timer: 1500,
      position: "top-end",
      text: "Permission mise à jour avec succès!",
      icon: "success"
    });
    router.push("/permissionps/liste-permissionp")
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la permission:', error);
    throw error;
  }
}

// ---------------------------------------------------- GET -------------------------------------------------------
const getAllPermissionP = async () => {
  try {
    const response = await ApiService.get('/permissionps');
    permissions.value = response.data;
    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la recupération des justificatifs:', error);
    throw error;
  }
}

onMounted(() => {
  getAllPermissionP()
})

</script>

<style></style>