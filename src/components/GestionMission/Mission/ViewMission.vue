<template>
  <div class="mission-details">
    <h1 class="text-center mb-4">Détails Mission</h1>

    <div class="position-relative mb-3" style="height: 50px; background-color: #f8f9fa;">
      <button
        class="btn btn-primary btn-sm"
        style="position: absolute; top: 10px; right: 10px;"
        @click="goBack"
      >
        Retour
      </button>
    </div>

    <!-- Affichage d'un loader si les données sont en cours de chargement -->
    <div v-if="loading" class="text-center">
      <p>Chargement des données...</p>
    </div>

    <!-- Affichage des données de la mission -->
    <div v-else class="card my-4">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Informations sur la Mission</h2>
        <div class="row">
          <div class="col-md-6 mb-3">
            <strong>Description :</strong>
            <p>{{ mission?.description || 'Non renseigné' }}</p>
          </div>

          <div class="col-md-6 mb-3">
            <strong>Destination :</strong>
            <p>{{ mission?.destination || 'Non renseigné' }}</p>
          </div>

          <div class="col-md-6 mb-3">
            <strong>Date Début :</strong>
            <p>{{ format_Date(mission?.dateDebut) || 'Non renseigné' }}</p>
          </div>

          <div class="col-md-6 mb-3">
            <strong>Date Fin :</strong>
            <p>{{ format_Date(mission?.dateFin) || 'Non renseigné' }}</p>
          </div>
        </div>
      </div>
    </div>

     <!-- Section des moyens roulants liés -->
     <div class="card my-4">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">MISSIONS ASSOCIEES</h2>
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
              <tr
                v-for="(tache, index) in mission?.taches" :key="index">
                <td>{{ tache?.titre || 'Non renseigné' }}</td>
                <td>{{ tache?.description || 'Non renseigné' }}</td>
                <td>{{ tache?.dateDebut || 'Non renseigné' }}</td>
                <td>{{ tache?.dateFin || 'Non renseigné' }}</td>

              </tr>
              <tr v-if="!(mission?.taches?.length)">
                <td colspan="3">Aucune tache associée</td>
              </tr>
            </tbody>
          </table>
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
        goBack(); // Retour si une erreur survient
      } finally {
        loading.value = false; // Fin du chargement
      }
    }

    // Fonction pour revenir à la liste des missions
    function goBack() {
      router.push({ name: "ListeMissionPage" }); // Redirige vers la liste des missions
    }

    // Au montage du composant, récupérer les données de la mission
    onMounted(() => {
      const id = route.params.id as string;
      if (id) {
        getMission(id);
      } else {
        error("ID de la mission non spécifié.");
        goBack();
      }
    });

    return {
      mission,
      loading,
      format_date,
      goBack,
      format_Date,
    };
  },
});
</script>

<style scoped>
.mission-details {
  max-width: 900px;
  margin: auto;
}
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.card-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.badge {
  font-size: 0.9rem;
}
</style>
