<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <div class="row">
        <div class="col-md-6 mb-3">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title text-black fw-bold mb-3">Informations sur les dates</h5>
              <p class="mb-2">
                <strong>Date de début :</strong> {{ formatDate(pointtresorerie?.dateDebut) }}
              </p>
              <p class="mb-2">
                <strong>Date de fin :</strong> {{ formatDate(pointtresorerie?.dateFin) }}
              </p>
              <p class="mb-2">
                <strong>Date d'exécution :</strong> {{ formatDate(pointtresorerie?.dateExecution) }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title text-black fw-bold mb-3">Informations financières</h5>
              <p class="mb-2">
                <strong>Montant total :</strong> {{ pointtresorerie?.montant }} €
              </p>
              <p class="mb-2">
                <strong>Montant visible :</strong> {{ pointtresorerie?.montantvisible }} €
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 d-flex flex-column mt-3">
        <div class="d-flex align-items-center">
          <router-link
            to="/pointtresoreries/liste-pointtresorerie"
            class="btn btn-danger"
          >
            <i class="fa fa-arrow-left lh-1 me-1 position-relative top-2"></i>
            Retour
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ApiService from "@/services/ApiService";
import { error } from "@/utils/utils";

export default defineComponent({
  name: "ViewPointtresorerie",
  setup() {
    const pointtresorerie = ref(null);
    const route = useRoute();

    const getPointtresorerie = async (id: number) => {
      try {
        const { data } = await ApiService.get(`/pointtresoreries/${id}`);
        pointtresorerie.value = data.data;
      } catch (err) {
        error(err.response?.data?.message || "Erreur lors de la récupération des données.");
      }
    };

    const formatDate = (dateString: string) => {
      if (!dateString) return "Non spécifiée";
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? "Format invalide" : date.toLocaleDateString("fr-FR");
    };

    onMounted(() => {
      if (route.params.id) {
        getPointtresorerie(parseInt(route.params.id as string));
      }
    });

    return { pointtresorerie, formatDate };
  },
});
</script>
