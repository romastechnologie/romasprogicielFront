<template>
  <div class="row">
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Informations Générales</h4>
            <router-link to="/missions/liste-missions"
              class="btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
          </div>

          <table class="table">
            <tbody>
              <tr>
                <td>Description</td>
                <td>{{ mission?.description || 'Non renseigné' }}</td>
              </tr>
              <tr>
                <td>Destination</td>
                <td>{{ mission?.destination || 'Non renseigné' }}</td>
              </tr>
              <tr>
                <td>Date de début</td>
                <td>{{ format_Date(mission?.dateDebut) || 'Non renseigné' }}</td>
              </tr>
              <tr>
                <td>Date de fin</td>
                <td>{{ format_Date(mission?.dateFin) || 'Non renseigné' }}</td>
              </tr>
            </tbody>
          </table>

          <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Missions</h4>
          </div>
          <div class="table-wrapper">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Description</th>
                  <th>Date Debut</th>
                  <th>Date Fin</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tache, index) in mission?.taches" :key="index">
                  <td>{{ tache?.titre || 'Non renseigné' }}</td>
                  <td>{{ tache?.description || 'Non renseigné' }}</td>
                  <td>{{ tache?.dateDebut || 'Non renseigné' }}</td>
                  <td>{{ tache?.dateFin || 'Non renseigné' }}</td>

                </tr>
              </tbody>
            </table>


          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { error, format_date, format_Date } from "@/utils/utils";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ViewMission",
  setup() {
    const route = useRoute();
    const router = useRouter();

    // Définition des données
    const mission = ref(null);
    const loading = ref(false); // Indique si les données sont en cours de chargement

    // Fonction pour récupérer les détails de la mission
    async function getMission(id: string) {
      loading.value = true; // Début du chargement
      try {
        const { data } = await ApiService.get(`/missions/${id}`);
        if (data?.data) {
          mission.value = data.data;
          console.log('data1',mission.value);
        } else {
          throw new Error("Données de la mission non trouvées.");
        }
      } catch (err) {
        error(err instanceof Error ? err.message : "Erreur lors de la récupération de la mission");
      } finally {
        loading.value = false; // Fin du chargement
      }
    }
    // Au montage du composant, récupérer les données de la mission
    onMounted(() => {
      const id = route.params.id as string;
      if (id) {
        getMission(id);
      } else {
        error("ID de la mission non spécifié.");
      }
    });

    return {
      mission,
      loading,
      format_date,
      format_Date,
    };
  },
});
</script>

<style scoped>

.table {
  text-align: left;
}

.table-wrapper {
  flex: 1;
  margin-right: 30px; /* Séparation entre les tables */
}

/* Optionnel : pour ne pas que la dernière table ait de marge à droite */
.table-wrapper:last-child {
  margin-right: 0;
}


</style>
