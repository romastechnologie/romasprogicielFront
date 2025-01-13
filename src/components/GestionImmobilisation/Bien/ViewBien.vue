<template>
    <div class="row">
        <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
          <div class="card mb-25 border-0 rounded-0">
            <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
              <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
                <h4 class="position-relative text-black fw-bold mb-10">Détails des biens</h4>
                <router-link to="/biens/liste-biens" 
                class=" btn btn-primary transition border-0 lh-1 fw-medium">
                <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Retour</router-link>
              </div>
              <table class="table">
                <tbody>
                  <tr>
                    <td>Référence :</td>
                    <td>{{ bien?.refBien }}</td>
                  </tr>
                  <tr>
                    <td>Nom Bien :</td>
                    <td>{{ bien?.nomBien }}</td>
                  </tr>
                  <tr>
                    <td>Cout d'acquisition :</td>
                    <td>{{ bien?.coutAcquisition }}</td>
                  </tr>
                  <tr>
                    <td>Date d'acquisition :</td>
                    <td>{{ bien?.dateAcquisition?.split('T')[0]?.split('-').reverse().join('-') }}</td>
                  </tr>
                  <tr v-if="bien?.dureeVie">
                    <td>Durée de vie :</td>
                    <td>{{ bien?.dureeVie}}</td>
                  </tr>
                  <tr>
                    <td>Date de mise en service :</td>
                    <td>{{ bien?.dateMiseEnService?.split('T')[0]?.split('-').reverse().join('-')  }}</td>
                  </tr>
                  <tr>
                    <td>Numéro d'enregistrement :</td>
                    <td>{{ bien?.numeroEnregistrement }}</td>
                  </tr>
                  <tr>
                    <td>Code Bar :</td>
                    <td>{{ bien?.codeBar }}</td>
                  </tr>
                  <tr>
                    <td>Localisation :</td>
                    <td>{{ bien?.localisation }}</td>
                  </tr>
                  <tr>
                    <td>Longitude :</td>
                    <td>{{ bien?.longitude }}</td>
                  </tr>
                  <tr>
                    <td>Latitude :</td>
                    <td>{{ bien?.latitude }}</td>
                  </tr>
                  <tr>
                    <td>Mode d'amortissement :</td>
                    <td>{{ bien?.modeAmortissement }}</td>
                  </tr>
                  <tr>
                    <td>Valeur nette comptable :</td>
                    <td>{{ bien?.valeurNetteComptable }}</td>
                  </tr>
                  <tr>
                    <td>Catégorie du Bien :</td>
                    <td>{{ bien?.categorieBien?.libelle }}</td>
                  </tr>
                  <tr>
                    <td>Type du Bien :</td>
                    <td>{{ bien?.typeBien?.libelle }}</td>
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
  import { Bien } from "@/models/Bien";
  import { error, format_date, showModal } from "@/utils/utils";
  import { useRoute } from "vue-router";

  
  export default defineComponent({
    name: "ViewBien",
    setup: () => {
      const route = useRoute();
      const bien = ref<Bien | null>(null);
  
      function getBien(id: string) {
        return ApiService.get("/biens", id)
          .then(({ data }) => {
            bien.value = data.data; 
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      } 
      onMounted(() => {
        const id = route.params.id as string;
        getBien(id);
      });
  
      return { 
        bien,
        getBien,
        format_date,
       };
    },
  });
  </script>
  