<template>
    <div class="row">
        <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
          <div class="card mb-25 border-0 rounded-0">
            <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
              <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
                <h4 class="position-relative text-black fw-bold mb-10">Détails des Etapes de Validations</h4>
                <router-link to="/etapeValidations/liste-etapeValidations" 
                class=" btn btn-primary transition border-0 lh-1 fw-medium">
                <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Retour</router-link>
              </div>
              <table class="table">
                <tbody>
                  <tr>
                    <td>Nom :</td>
                    <td>{{ etapeValidation?.nom }}</td>
                  </tr>
                  <tr>
                    <td>Ordre :</td>
                    <td>{{ etapeValidation?.Ordre }}</td>
                  </tr>
                  <tr>
                    <td>Statut :</td>
                    <td>{{ etapeValidation?.statut }}</td>
                  </tr>
                  <tr>
                    <td>Durée :</td>
                    <td>{{ etapeValidation?.Duree}}</td>
                  </tr>
                  
                  <tr>
                    <td>Type Durée :</td>
                    <td>{{ etapeValidation?.typeDuree }}</td>
                  </tr>
                  <tr>
                    <td>Circuit :</td>
                    <td>{{ etapeValidation?.circuit }}</td>
                  </tr>
                  <tr>
                    <td>Role Etape :</td>
                    <td>{{ etapeValidation?.roleetap }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import ApiService from "@/services/ApiService";
  import { error, format_date, showModal } from "@/utils/utils";
  import { useRoute } from "vue-router";
import { EtapeValidation } from "@/models/EtapeValidation";
  
  export default defineComponent({
    name: "ViewEtapeValidation",
    setup: () => {
      const route = useRoute();
      const etapeValidation = ref<EtapeValidation | null>(null);
  
      function getEtapeValidation(id: string) {
        return ApiService.get("/etapeValidations", id)
          .then(({ data }) => {
            etapeValidation.value = data.data; 
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      } 
      onMounted(() => {
        const id = route.params.id as string;
        getEtapeValidation(id);
      });
  
      return { 
        etapeValidation,
        getEtapeValidation,
        format_date,
       };
    },
  });
  </script>
  