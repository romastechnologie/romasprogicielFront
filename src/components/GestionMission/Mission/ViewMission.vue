<template>
  <div class="mission-details">
    <h1 class="text-center mb-4">Détails Mission</h1>

    <div class="position-relative mb-3" style="height: 50px; background-color: #f8f9fa;">
      <button class="btn btn-primary btn-sm" style="position: absolute; top: 10px; right: 10px;" @click="goBack">
        Retour
      </button>
    </div>
    
    <div class="card my-4">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Informations sur la Mission</h2>
        <div class="row">
          <div class="col-md-6 mb-3">
            <strong>Description :</strong>
            <p>{{ mission.description || 'Non renseigné' }}</p>
          </div>

          <div class="col-md-6 mb-3">
            <strong>Destination :</strong>
            <p>{{ mission.destination || 'Non renseigné' }}</p>
          </div>

          <div class="col-md-6 mb-3">
            <strong>Date Debut :</strong>
            <p>{{ format_Date(mission.dateDebut) || 'Non renseigné' }}</p>
          </div>

          <div class="col-md-6 mb-3">
            <strong>Date Fin :</strong>
            <p>{{ format_Date(mission.dateFin) || 'Non renseigné' }}</p>
          </div>
          </div>  
  </div>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { error, format_date,format_Date} from "@/utils/utils";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ViewMission",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const mission = ref(null);

    async function getMission(id: string) {
      try {
        const { data } = await ApiService.get(`/missions/${id}`);
        if (data?.data) {
          mission.value = data.data;
        } else {
          throw new Error("Données de la mission non trouvées.");
        }
      } catch (err) {
        error(err instanceof Error ? err.message : "Erreur lors de la récupération de la mission");
        goBack(); // Retourne si une erreur survient
      }
    }

    function goBack() {
      router.push({ name: "ListeMissionPage" }); // Redirige vers la liste des missions
    }

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
      format_date,
      goBack,
      format_Date
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
.button {
  z-index: 1000;
}
</style>
