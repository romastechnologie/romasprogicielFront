<template>
    <div class="p-5 ">
      <h4 class="text-center"> Modifier le congé </h4>
      <template v-for="conge in conges" :key="conge.id">
        <div v-if="conge.id == $route.params.id" class="card p-2 col-lg-6 col-md-7 mx-auto">
          <Form @submit="updateConge" :validation-schema="schemaConge()">
            <p class="my-0"> Date de debut </p>
            <Field type="date" name="dateDebut" id="dateDebut" class="form-control mb-1 " />
            <ErrorMessage name="dateDebut" class="text-danger text-start mb-2" />
            <p class="my-0"> Date de fin </p>
            <Field type="date" name="dateFinPrevu" id="dateFinPrevu" class="form-control mb-1" />
            <ErrorMessage name="dateFinPrevu" class="text-danger text-start mb-2" />
            <p class="my-0"> Date de reprise </p>
            <Field type="date" name="dateReprise" id="dateReprise" class="form-control mb-1" />
            <ErrorMessage name="dateReprise" class="text-danger text-start mb-2" />
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary col-12" style="background-"> Modifier </button>
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
  import { onMounted, ref } from 'vue';
import ApiService from '@/services/ApiService';
  
  const router = useRouter()
  const route = useRoute()
  
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: false,
  });
  
  const conges = ref([] as any[]);
  
  // ------------------------------------------------ SCHEMA -------------------------------------------------
  
  function schemaConge() {
    return yup.object().shape({
      dateDebut: yup.date().required("La date de début est obligatoire."),
      dateFinPrevu: yup.date().required("La date de fin est obligatoire."),
      dateReprise: yup.date().required("La date de reprise est obligatoire."),
    })
  }
  
  // ------------------------------------------------ UPDATE -------------------------------------------------
  
  async function updateConge(value: object) {
  
    try {
      const response = await ApiService.put(`/personnelConges/${route.params.id}`, value);
      Swal.fire({
        timer: 1500,
        position: "top-end",
        text: "Congé mise à jour avec succès!",
        icon: "success"
      });
      router.push("/conges/liste-conge")
    } catch (error) {
      console.error('Erreur lors de la mise à jour du congé:', error);
      throw error;
    }
  }
  
  const getAllPersonnelConges = async () => {
    try {
      const response = await ApiService.get('/personnelConges');
      conges.value = response.data;
      
    } catch (error) {
      console.error('Erreur lors de la recupération des congés:', error);
      throw error;
    }
  }
  
  onMounted(() => {
    getAllPersonnelConges();
  })
  
  </script>
  
  <style></style>