<template>
  <div class="type-entretien-details">
    <h1 class="text-center mb-4">Détails du Type d'Entretien</h1>

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

    <!-- Affichage des données du type d'entretien -->
    <div v-else>
      <div class="card my-4">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">INFORMATIONS GENERALES</h2>
          <div class="row">
            <div class="col-md-6 mb-3">
              <strong>Libellé :</strong>
              <p>{{ typeEntretien?.libelle || 'Non renseigné' }}</p>
            </div>

            <div class="col-md-6 mb-3">
              <strong>Description :</strong>
              <p>{{ typeEntretien?.description || 'Non renseigné' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section des moyens roulants liés -->
      <div class="card my-4">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">MOYENS ROULANTS</h2>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Type</th>
                <th>Valeur</th>
                <th>Unité de mesure</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(moyen, index) in typeEntretien?.AffectationATypeEntretien || []"
                :key="index"
              >
                <td>{{ moyen?.typebien?.libelle || 'Non renseigné' }}</td>
                <td>{{ moyen?.valeur || 'Non renseigné' }}</td>
                <td>{{ moyen?.unitemesure || 'Non renseigné' }}</td>
              </tr>
              <tr v-if="!(typeEntretien?.AffectationATypeEntretien?.length)">
                <td colspan="3">Aucun TypeMoyensRoulantsEntretien</td>
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
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/services/ApiService";
import { error } from "@/utils/utils";

interface AffectationATypeEntretien {
  type: string;
  valeur: string;
  uniteMesure: string;
}

interface TypeEntretien {
  libelle: string;
  description: string;
  moyensRoulants: AffectationATypeEntretien[];
}

export default defineComponent({
  name: "ViewTypeEntretien",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const typeEntretien = ref<TypeEntretien | null>(null);
    const loading = ref<boolean>(false);

    // Fonction pour récupérer les détails du type d'entretien
    const getTypeEntretien = async (id: string) => {
      loading.value = true;
      try {
        const { data } = await ApiService.get(`/typeEntretiens/${id}`);
        if (data?.data) {
          typeEntretien.value = data.data;
          console.log('data1',typeEntretien.value);
        } else {
          throw new Error("Données du type d'entretien non trouvées.");
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Erreur lors de la récupération du type d'entretien.";
        error(message);
      } finally {
        loading.value = false;
      }
    };

    // Fonction pour revenir à la liste des types d'entretiens
    const goBack = () => {
      router.push({ name: "ListeTypeEntretienPage" });
    };

    onMounted(() => {
      const id = route.params.id as string | undefined;
      if (id) {
        getTypeEntretien(id);
      } else {
        error("ID du type d'entretien non spécifié.");
        goBack();
      }
    });

    return {
      typeEntretien,
      loading,
      goBack,
    };
  },
});
</script>

<style scoped>
.type-entretien-details {
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
