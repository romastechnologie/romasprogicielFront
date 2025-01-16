<template>
  <div class="circuit-details">
    <h1 class="text-center mb-4">Détails du Circuit</h1>

    <div class="position-relative mb-3" style="height: 50px; background-color: #f8f9fa;">
      <button
        class="btn btn-primary btn-sm"
        style="position: absolute; top: 10px; right: 10px;"
        @click="goBack"
      >
        Retour
      </button>
    </div>

    <!-- Loader si les données sont en cours de chargement -->
    <div v-if="loading" class="text-center">
      <p>Chargement des données...</p>
    </div>

    <!-- Affichage des données du circuit -->
    <div v-else>
      <div class="card my-4">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">INFORMATIONS GENERALES</h2>
          <div class="row">
            <div class="col-md-6 mb-3">
              <strong>Nom du circuit :</strong>
              <p>{{ circuit?.nom || 'Non renseigné' }}</p>
            </div>

            <div class="col-md-6 mb-3">
              <strong>Durée :</strong>
              <p>{{ circuit?.Duree || 'Non renseigné' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section des étapes -->
      <div class="card my-4">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">ETAPES</h2>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Ordre</th>
                <th>Durée</th>
                <th>Rôle</th>
                <th>Personnels</th>
              </tr>
            </thead>
            <tbody>
  <tr v-for="(etape, index) in circuit?.etapevalidations" :key="index">
    <td>{{ etape?.nom || 'Non renseigné' }}</td>
    <td>{{ etape?.Ordre || 'Non renseigné' }}</td>
    <td>{{ etape?.Duree || 'Non renseigné' }}</td>
    <td>{{ etape?.roleetap?.libelle || 'Non renseigné' }}</td>
    <td>{{ etape?.useretapes?.userId?.join(', ') || 'Aucun personnel' }}</td>

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
import { error } from "@/utils/utils";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ViewCircuit",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const circuit = ref(null);
    const loading = ref(false);

    // Fonction pour récupérer les détails du circuit
    async function getCircuit(id: string) {
      loading.value = true;
      try {
        const { data } = await ApiService.get(`/circuits/${id}`);
        if (data?.data) {
          circuit.value = data.data;
    console.log('valeurs',circuit.value);

        } else {
          throw new Error("Données du circuit non trouvées.");
        }
      } catch (err) {
        error(err instanceof Error ? err.message : "Erreur lors de la récupération du circuit");
        goBack();
      } finally {
        loading.value = false;
      }
    }

    // Fonction pour revenir à la liste des circuits
    function goBack() {
      router.push({ name: "ListeCircuitPage" });
    }

    onMounted(() => {
      const id = route.params.id as string;
      if (id) {
        getCircuit(id);
      } else {
        error("ID du circuit non spécifié.");
        goBack();
      }
    });

    return {
      circuit,
      loading,
      goBack,
    };
  },
});
</script>

<style scoped>
.circuit-details {
  max-width: 1000px;
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
.table {
  text-align: center;
}
</style>
