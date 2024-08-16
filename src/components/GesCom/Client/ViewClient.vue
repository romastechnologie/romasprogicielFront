<template>
  <div class="row">
      <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
        <div class="card mb-25 border-0 rounded-0">
          <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">Informations générales</h4>
              <router-link to="/clients/liste-clients" 
              class=" btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
            </div>
            <table class="table">
              <tbody>
                <tr>
                  <td>Nom</td>
                  <td>{{ client?.nomClient }}</td>
                </tr>
                <tr>
                  <td>Prénom</td>
                  <td>{{ client?.prenomClient }}</td>
                </tr>
                <tr>
                  <td>Adresse client</td>
                  <td>{{ client?.adresseClient }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{{ client?.emailClient }}</td>
                </tr>
                <tr v-if="client?.telephone1">
                  <td>Téléphone 1</td>
                  <td>{{ client?.telephone1 }}</td>
                </tr><tr v-if="client?.telephone2">
                  <td>Téléphone 2</td>
                  <td>{{ client?.telephone1 }}</td>
                </tr>
                <tr>
                  <td>Date de naissance</td>
                  <td>{{ client?.dateNais }}</td>
                </tr>
                <tr>
                  <td>Raison sociale</td>
                  <td>{{ client?.raisonSociale }}</td>
                </tr>
                <tr>
                  <td>Ifu</td>
                  <td>{{ client?.ifu }}</td>
                </tr>
                <tr>
                  <td>Dénomination</td>
                  <td>{{ client?.denomination }}</td>
                </tr>
                <tr>
                  <td>Date création</td>
                  <td>{{ client?.dateCreation }}</td>
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
import { Client } from "@/models/Client";
import { error, format_Date, showModal } from "@/utils/utils";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ViewClient",
  setup: () => {
    const route = useRoute();
    const client = ref<Client | null>(null);

    function getClient(id: string) {
      return ApiService.get("/clients", id)
        .then(({ data }) => {
          client.value = data.data; 
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    } 
    onMounted(() => {
      const id = route.params.id as string;
      getClient(id);
    });

    return { 
      client,
      getClient,
      format_Date,
     };
  },
});
</script>
