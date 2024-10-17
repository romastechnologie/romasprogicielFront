<template>
  <div class="row">
      <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
        <div class="card mb-25 border-0 rounded-0">
          <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">Détails des demandes</h4>
              <router-link to="/demandes/liste-demandes" 
              class=" btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
            </div>
            <table class="table">
              <tbody>
                <tr>
                  <td>Date :</td>
                  <td>{{ demande?.dateDemande }}</td>
                </tr>
                <tr>
                  <td>Categorie Demande :</td>
                  <td>{{ demande?.categorieId }}</td>
                </tr>
                <tr>
                  <td>Personnel :</td>
                  <td>{{ demande?.personnel }}</td>
                </tr>
                <tr>
                  <td>Motif de permission :</td>
                  <td>{{ demande?.motifPermisssion}}</td>
                </tr>
              
                <tr>
                  <td>Type Conge :</td>
                  <td>{{ demande?.typeConge }}</td>
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
import { Demande } from "@/models/Demande";
import { error, format_date, showModal } from "@/utils/utils";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ViewDemande",
  setup: () => {
    const route = useRoute();
    const demande = ref<Demande | null>(null);

    function getDemande(id: string) {
      return ApiService.get("/demandes", id)
        .then(({ data }) => {
          demande.value = data.data; 
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    } 
    onMounted(() => {
      const id = route.params.id as string;
      getDemande(id);
    });

    return { 
      demande,
      getDemande,
      format_date,
     };
  },
});
</script>
