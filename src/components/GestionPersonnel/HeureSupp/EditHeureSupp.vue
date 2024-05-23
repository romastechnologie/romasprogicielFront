<template>
    <div class="p-5 ">
      <h4 class="text-center"> Modifier l'heure supplémentaire </h4>
      <template v-for="heuresup in heuresups" :key="heuresup.id">
        <div v-if="heuresup.id == $route.params.id" class="card p-2 col-lg-6 col-md-7 mx-auto">
          <Form @submit="updateHeureSup" :validation-schema="schemaHeureSup()">
            <p class="my-0"> Date </p>
            <Field type="date" name="date" id="date" class="form-control mb-1" />
            <ErrorMessage name="date" class="text-danger text-start mb-2" />
            <p class="my-0"> Durée </p>
            <Field type="text" name="duree" id="duree" class="form-control mb-1" />
            <ErrorMessage name="duree" class="text-danger text-start mb-2" />
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary col-12" style="background-color: #00247E;"> Modifier </button>
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
  import $store from '@/store';
  import { useRouter, useRoute } from 'vue-router';
  import Swal from 'sweetalert2';
  import axios from 'axios';
  
  const router = useRouter()
  const route = useRoute()
  
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: false,
  });
  
  const heuresups = $store.state.heuresups;
  
  // ------------------------------------------------ SCHEMA -------------------------------------------------
  
  function schemaHeureSup() {
    return yup.object().shape({
      date: yup.string().required("La date est requise."),
      duree: yup.string().required("La durrée est requise."),
    })
  }
  
  // ------------------------------------------------ UPDATE -------------------------------------------------
  
  async function updateHeureSup(value: object) {
  
    try {
      const response = await axios.patch(`http://localhost:3000/heureSups/${route.params.id}`, value);
      Swal.fire({
        timer: 1500,
        position: "top-end",
        text: "Heure supplémentaire modifié avec succès!",
        icon: "success"
      });
      $store.commit('UPDATE_HEURESUP', response.data);
      router.push("/heureSups")
    } catch (error) {
      console.error('Erreur lors de la modification due l\'heure supplementaire:', error);
      throw error;
    }
  }
  
  </script>
  
  <style></style>