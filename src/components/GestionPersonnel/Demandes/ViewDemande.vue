<template>
  <div class="row">
      <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
        <div class="card mb-25 border-0 rounded-0">
          <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">Détails des demandes</h4>
              <router-link to="/demandes/ajouter-demande" 
              class=" btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
            </div>
            <table class="table">
              <tbody>
                <tr>
                  <td>Date:</td>
                  <td>{{ demande?.date }}</td>
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
                  <td>Motif de la demande :</td>
                  <td>{{ demande?.motifDemande}}</td>
                </tr>
                <tr>
                  <td>Statut :</td>
                  <td>{{ demande?.statut }}</td>
                </tr>
               
                <tr v-if="demande?.dateDebut">
                  <td>Date Début :</td>
                  <td>{{ demande?.dateDebut }}</td>
                </tr>
                <tr v-if="demande?.dateFinPrevu">
                  <td>Date Fin Prévue :</td>
                  <td>{{ demande?.dateFinPrevu }}</td>
                </tr>
                <tr v-if="demande?.dateFin">
                  <td>Date Fin :</td>
                  <td>{{ demande?.dateFin }}</td>
                </tr>
                <tr v-if="demande?.dateReprise">
                  <td>Date Reprise :</td>
                  <td>{{ demande?.dateReprise }}</td>
                </tr>
                <tr v-if="demande?.montantPret">
                  <td>Montant Total du Prêt :</td>
                  <td>{{ demande?.montantPret }}</td>
                </tr>
                <tr>
                <td>Fichier</td>
                <td>
                  <a
                  v-if="demande?.photoDemande"
                  :href="getUrlApiForFiles(demande.photoDemande, 'Demandes')"
                  target="_blank"
                  download
                >
                  <template v-if="isPdf(demande.photoDemande)">
                    <i class="bi bi-file-earmark-pdf-fill text-danger" style="font-size: 2.5rem;"></i>
                    <span class="d-block">Télécharger le PDF</span>
                  </template>
                  <template v-else>
                    <img
                      :src="getUrlApiForFiles(demande.photoDemande, 'Demandes')"
                      alt="Demande Image"
                      class="img-thumbnail"
                      style="width: 120px; height: 120px;"
                    />
                  </template>
                </a>

                </td>
              </tr>
               <!-- <table  class="table">
                <tbody>
                <tr v-if="demande.echeances">
                  <td>Date d'écheance :</td>
                  <td>{{echeance?.dateEcheance }}</td>
                </tr>
                <tr v-if="demande?.echeances">
                  <td>Montant :</td>
                  <td>{{ demande?.echeance?.montant }}</td>
                </tr>
              </tbody>
          </table>-->
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
import { error, format_date, showModal,getUrlApiForFiles } from "@/utils/utils";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ViewDemande",
  setup: () => {
    const route = useRoute();
    const demande = ref<Demande | null>(null);

    function isPdf(fileName: string): boolean {
  return fileName.toLowerCase().endsWith('.pdf');
}

    function getDemande(id: string) {
      return ApiService.get("/demandes",id)
        .then(({ data }) => {
          console.log(data.data,"je suis la")
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
      getUrlApiForFiles,
      isPdf

     };
  },
});
</script>
