<template>
  <div class="row">
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <router-link to="/circuits/liste-circuits" 
              class="btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>

          <!-- Loader si les données sont en cours de chargement -->
          <div v-if="loading" class="text-center">
            <p>Chargement des données...</p>
          </div>

          <!-- Détails du Circuit -->
          <div v-else>
            <!-- Informations Générales -->
            <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">INFORMATIONS GENERALES</h4>
            </div>
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

            <!-- Section des étapes -->
            <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">ETAPES</h4>
            </div>
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
                <tr v-if="!(circuit?.etapevalidations?.length)">
                  <td colspan="5">Aucune étape définie</td>
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
.table {
  text-align: left;
}

.card-head {
  margin-bottom: 1rem;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
