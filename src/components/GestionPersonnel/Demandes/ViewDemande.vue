<template>
  <div class="row">
      <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
        <div class="card mb-25 border-0 rounded-0">
          <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">Détails des demandes</h4>
              <router-link to="/demandes/liste-demande-permission" 
              class=" btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
            </div>
            <table class="table">
              <tbody>
                <tr>
                  <td>Date de la demande:</td>
                  <td>{{ demande?.dateDemande }}</td>
                </tr>
                <tr>
                  <td>Nom :</td>
                  <td>{{ demande?.personnel?.nom }} </td>
                </tr>
                <tr>
                  <td>Prénom :</td>
                  <td>{{ demande?.personnel?.prenom }} </td>
                </tr>
                <tr>
                  <td>Motif de la permission :</td>
                  <td>{{ demande?.motifDemande}}</td>
                </tr>
                <tr>
                  <td>Statut :</td>
                  <td>{{ demande?.statut }}</td>
                </tr>
               
                <tr>
                  <td>Date Début :</td>
                  <td>{{ demande?.dateDebut }}</td>
                </tr>
                <tr>
                  <td>Date Fin Prévue :</td>
                  <td>{{ demande?.dateFinPrevu }}</td>
                </tr>
                <tr>
                  <td>Date Fin :</td>
                  <td>{{ demande?.dateFin }}</td>
                </tr>
                <tr>
                  <td>Date Reprise :</td>
                  <td>{{ demande?.dateReprise }}</td>
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
      return ApiService.get("/demandes",id)
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
