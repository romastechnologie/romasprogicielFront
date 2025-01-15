<template>
  <div class="row">
      <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
        <div class="card mb-25 border-0 rounded-0">
          <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">Détails des notes missions</h4>
              <router-link to="/noteMissions/liste-noteMissions" 
              class=" btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
            </div>
            <table class="table">
              <tbody>
                <tr>
                  <td>Référence :</td>
                  <td>{{ noteMission?.reference }}</td>
                </tr>
                <tr>
                  <td>Mission:</td>
                  <td>{{ noteMission?.mission?.description }}</td>
                </tr>
                <tr>
                  <td>Budget :</td>
                  <td>{{ noteMission?.budget}}</td>
                </tr>
                <tr>
                  <td>Contenu:</td>
                  <td>{{  noteMission?.contenue}}</td>
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
import { NoteMission } from "@/models/NoteMission";
import { error, format_date, showModal } from "@/utils/utils";
import { useRoute } from "vue-router";


export default defineComponent({
  name: "ViewNoteMission",
  setup: () => {
    const route = useRoute();
    const noteMission = ref<NoteMission | null>(null);

    function getNoteMission(id: string) {
      return ApiService.get("/noteMissions", id)
        .then(({ data }) => {
          console.log("donnée", data);
          noteMission.value = data.data; 
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    } 
    onMounted(() => {
      const id = route.params.id as string;
      getNoteMission(id);
    });

    return { 
      noteMission,
      getNoteMission,
      format_date,
     };
  },
});
</script>
