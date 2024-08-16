<template>
  <div class="row">
      <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
        <div class="card mb-25 border-0 rounded-0">
          <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">Informations générales</h4>
              <router-link to="/liste-personnels" 
              class=" btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
            </div>
            <table class="table">
              <tbody>
                <tr>
                  <td>Nom</td>
                  <td>{{ personnel?.nom }}</td>
                </tr>
                <tr>
                  <td>Prénom</td>
                  <td>{{ personnel?.prenom }}</td>
                </tr>
                <tr>
                  <td>Adresse</td>
                  <td>{{ personnel?.adresse }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{{ personnel?.email }}</td>
                </tr>
                <tr v-if="personnel?.tel">
                  <td>Téléphone </td>
                  <td>{{ personnel?.tel}}</td>
                </tr>
                <tr>
                  <td>Sexe</td>
                  <td>{{ personnel?.sexe }}</td>
                </tr>
                <tr>
                  <td>Civilite</td>
                  <td>{{ personnel?.civilite }}</td>
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
import { Personnel } from "@/models/Personnel";
import { error, format_Date, showModal } from "@/utils/utils";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ViewPersonnel",
  setup: () => {
    const route = useRoute();
    const personnel = ref<Personnel | null>(null);

    function getPersonnel(id: string) {
      return ApiService.get("/personnels", id)
        .then(({ data }) => {
          personnel.value = data.data; 
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    } 
    onMounted(() => {
      const id = route.params.id as string;
      getPersonnel(id);
    });

    return { 
      personnel,
      getPersonnel,
      format_Date,
     };
  },
});
</script>
