<template>
  <div class="row">
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Informations Générales</h4>
            <router-link to="/typeEntretiens/liste-typeEntretien" 
              class="btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
          </div>
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
          
          <!-- Moyens Roulants -->
          <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Moyens Roulants</h4>
          </div>
        <div class="table-wrapper">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Type</th>
                <th>Valeur</th>
                <th>Unité de mesure</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(moyen, index) in typeEntretien?.AffectationATypeEntretien || []" :key="index">
                <td>{{ moyen?.typebien?.libelle || 'Non renseigné' }}</td>
                <td>{{ moyen?.valeur || 'Non renseigné' }}</td>
                <td>{{ moyen?.unitemesure || 'Non renseigné' }}</td>
              </tr>
              <tr v-if="!(typeEntretien?.AffectationATypeEntretien?.length)">
                <td colspan="3">Aucun Moyen Roulant</td>
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
import { useRoute } from "vue-router";
import ApiService from "@/services/ApiService";
import { error } from "@/utils/utils";

interface MoyenRoulant {
  typebien: { libelle: string };
  valeur: string;
  unitemesure: string;
}

interface TypeEntretien {
  libelle: string;
  description: string;
  AffectationATypeEntretien: MoyenRoulant[];
}

export default defineComponent({
  name: "ViewTypeEntretien",
  setup() {
    const route = useRoute();
    const typeEntretien = ref<TypeEntretien | null>(null);
    const loading = ref<boolean>(false);

    // Fonction pour récupérer les détails du type d'entretien
    const getTypeEntretien = async (id: string) => {
      loading.value = true;
      try {
        const { data } = await ApiService.get(`/typeEntretiens/${id}`);
        if (data?.data) {
          typeEntretien.value = data.data;
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

    onMounted(() => {
      const id = route.params.id as string | undefined;
      if (id) {
        getTypeEntretien(id);
      } else {
        error("ID du type d'entretien non spécifié.");
      }
    });

    return {
      typeEntretien,
      loading
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
