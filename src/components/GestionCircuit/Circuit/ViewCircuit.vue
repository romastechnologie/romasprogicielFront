<template>
  <div class="row">
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Informations Générales</h4>
            <router-link to="/circuits/liste-circuits" 
              class="btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
          </div>
          <table class="table">
            <tbody>
              <tr>
                <td>Nom</td>
                <td>{{circuit?.nom|| 'Non renseigné' }}</td>
              </tr>
              <tr>
                <td>Durée du Circuit</td>
                <td>{{ circuit?.Duree +'' + circuit?.typeDuree  || 'Non renseigné' }}</td>
              </tr>
            </tbody>
          </table>

          <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">ETAPES</h4>
          </div>
          <div class="table-wrapper">

          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Ordre</th>
                <th>Durée du circuit</th>
                <th>Role Etape</th>
                <th>Users</th>


              </tr>
            </thead>
            <tbody>
              <tr v-for="(etape, index) in circuit?.etapevalidations" :key="index">
                <td>{{ etape?.nom || 'Non renseigné' }}</td>
                <td>{{ etape?.Ordre || 'Non renseigné' }}</td>
                <td>{{ etape?.Duree || 'Non renseigné' }}</td>
                <td>{{ etape?.roleetap?.libelle || 'Non renseigné' }}</td>
                <td>{{ etape?.etapevalidations?.useretapes?.userId || 'Non renseigné' }}</td>
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
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      const id = route.params.id as string;
      if (id) {
        getCircuit(id);
      } else {
        error("ID du circuit non spécifié.");
      }
    });

    return {
      circuit,
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
