<template>
  <div class="filter-section mb-4">
    <h4 class="mb-3">Filtres de Recherche</h4>
    <form @submit.prevent="applyFilters">
      <div class="row">
        <!-- Champ : Date Fin de Conservation -->
        <div class="col-md-3">
          <label for="dateFinConservation" class="form-label">Date Fin Conservation</label>
          <input
            v-model="filters.dateFinConservation"
            type="date"
            id="dateFinConservation"
            class="form-control"
          />
        </div>

        <!-- Champ : Nom du document -->
        <div class="col-md-3">
          <label for="nom" class="form-label">Nom du Document</label>
          <input
            v-model="filters.nom"
            type="text"
            id="nom"
            class="form-control"
            placeholder="Entrer le nom du document"
          />
        </div>

        <!-- Champ : Description -->
        <div class="col-md-3">
          <label for="description" class="form-label">Description</label>
          <input
            v-model="filters.description"
            type="text"
            id="description"
            class="form-control"
            placeholder="Entrer la description"
          />
        </div>

        <!-- Champ : Référence -->
        <div class="col-md-3">
          <label for="refDoc" class="form-label">Référence</label>
          <input
            v-model="filters.refDoc"
            type="text"
            id="refDoc"
            class="form-control"
            placeholder="Entrer la référence"
          />
        </div>

        <!-- Boutons -->
        <div class="col-md-12 mt-3 d-flex justify-content-end">
          <button type="submit" class="btn btn-primary me-2" @click="applyFilters">
            Appliquer les Filtres
          </button>
          <button type="button" class="btn btn-secondary" @click="resetFilters">
            Réinitialiser
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FilterDocument",
  setup(_, { emit }) {
    const filters = ref({
      dateFinConservation: "",
      nom: "",
      description: "",
      refDoc: "",
    });

    const applyFilters = () => {
      console.log("Bouton 'Appliquer les Filtres' cliqué !");
      console.log("Valeurs actuelles des filtres :", filters.value);
      console.log("Filtres appliqués :", filters.value); // DEBUG
      emit("filter-change", filters.value);
      console.log("Événement 'filter-change' émis avec :", filters.value);
    };

    const resetFilters = () => {
      filters.value = {
        dateFinConservation: "",
        nom: "",
        description: "",
        refDoc: "",
      };
      console.log("Filtres réinitialisés"); // DEBUG
      emit("filter-change", filters.value);
    };

    return {
      filters,
      applyFilters,
      resetFilters,
    };
  },
});
</script>

<style scoped>
.filter-section {
  background-color: #f8f9fa;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>