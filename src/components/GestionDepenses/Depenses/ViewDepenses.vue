<template>
    <div class="row">
        <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
          <div class="card mb-25 border-0 rounded-0">
            <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
              <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
                <h4 class="position-relative text-black fw-bold mb-10">Détails des depenses</h4>
                <router-link to="/depenses/liste-depenses" 
                class=" btn btn-primary transition border-0 lh-1 fw-medium">
                <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Retour</router-link>
              </div>
              <table class="table">
                <tbody>
                    <tr>
                    <td>Date :</td>
                    <td>{{ format_date(depense?.createdAt)  }}</td>
                  </tr>  
                  <tr>
                    <td>Libellé :</td>
                    <td>{{ depense?.libelle }}</td>
                  </tr>
                  <tr>
                    <td>Montant :</td>
                    <td>{{ separateur(depense?.montant) }}</td>
                  </tr>
                  <tr>
                    <td>Entretien :</td>
                    <td>{{ depense?.entretien?.libelle }}</td>
                  </tr>
                  <tr>
                    <td>Planification:</td>
                    <td>{{ depense?.planification?.libelle }}</td>
                  </tr>
                  <tr>
                    <td>Catégorie dépense :</td>
                    <td>{{ depense?.categoriedepense?.libelle }}</td>
                  </tr>

                  <tr>
                    <td>Entretien:</td>
                    <td>{{ depense?.entretien?.libelle }}</td>
                  </tr>

                  <tr>
                    <td>Type dépense :</td>
                    <td>{{ depense?.typedepense?.libelle }}</td>
                  </tr>
                  <tr>
                    <td>Bénéficiaire :</td>
                    <td>{{ depense?.beneficiaire }} {{ depense?.personnel?.nom}}  {{ depense?.personnel?.prenom}}</td>
                  </tr>
                  <tr>
                    <td>Motif :</td>
                    <td>{{ depense?.motif }}</td>
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
  import { Depense } from "@/models/Depense";
  import { error, format_date, showModal,separateur } from "@/utils/utils";
  import { useRoute } from "vue-router";

  
  export default defineComponent({
    name: "ViewDepenses",
    setup: () => {
      const route = useRoute();
      const depense = ref<Depense | null>(null);

      function getDepense(id: string) {
        return ApiService.get("/depenses", id)
          .then(({ data }) => {
            console.log(data, 'depense');
            depense.value = data.data; 
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      } 
      onMounted(() => {
        const id = route.params.id as string;
        getDepense(id);
      });
  
      return { 
        depense,
        getDepense,
        format_date,
        separateur
       };
    },
  });
  </script>
  