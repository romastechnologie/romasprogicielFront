<template>
  <div class="row">
      <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
        <div class="card mb-25 border-0 rounded-0">
          <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">Informations générales</h4>
              <router-link to="/fournisseurs/liste-fournisseurs" 
              class=" btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
            </div>
            <table class="table">
              <tbody>
                <tr>
                  <td>Nom</td>
                  <td>{{ fournisseur?.nomFournisseur }}</td>
                </tr>
                <tr>
                  <td>Prénom</td>
                  <td>{{ fournisseur?.prenomFournisseur }}</td>
                </tr>
                <tr>
                  <td>Adresse fournisseur</td>
                  <td>{{ fournisseur?.adresseFournisseur }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{{ fournisseur?.emailFournisseur }}</td>
                </tr>
                <tr v-if="fournisseur?.telephone1">
                  <td>Téléphone 1</td>
                  <td>{{ fournisseur?.telephone1 }}</td>
                </tr><tr v-if="fournisseur?.telephone2">
                  <td>Téléphone 2</td>
                  <td>{{ fournisseur?.telephone1 }}</td>
                </tr>
                <tr>
                  <td>Date de naissance</td>
                  <td>{{ fournisseur?.dateNais }}</td>
                </tr>
                <tr>
                  <td>Raison sociale</td>
                  <td>{{ fournisseur?.raisonSociale }}</td>
                </tr>
                <tr>
                  <td>Ifu</td>
                  <td>{{ fournisseur?.ifu }}</td>
                </tr>
                <tr>
                  <td>Dénomination</td>
                  <td>{{ fournisseur?.denomination }}</td>
                </tr>
                <tr>
                  <td>Date création</td>
                  <td>{{ fournisseur?.dateCreation }}</td>
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
import { Fournisseur } from "@/models/Fournisseur";
import { error, format_Date, showModal } from "@/utils/utils";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ViewFournisseur",
  setup: () => {
    const route = useRoute();
    const fournisseur = ref<Fournisseur | null>(null);

    function getFournisseur(id: string) {
      return ApiService.get("/fournisseurs", id)
        .then(({ data }) => {
          fournisseur.value = data.data; 
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    } 
    onMounted(() => {
      const id = route.params.id as string;
      getFournisseur(id);
    });

    return { 
      fournisseur,
      getFournisseur,
      format_Date,
     };
  },
});
</script>
