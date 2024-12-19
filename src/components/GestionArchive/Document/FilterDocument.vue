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

        <!-- Champ : Catégorie -->
        <div class="col-md-3">
          <label for="categorie" class="form-label">Catégorie</label>
          <Multiselect
            v-model="filters.categorie"
            :options="categoriesOptions"
            placeholder="Sélectionner une catégorie"
            label="label"
            track-by="value"
            :multiple="false"
          />
        </div>

        <!-- Champ : Type de document -->
        <div class="col-md-3">
          <label for="typeDoc" class="form-label">Type de Document</label>
          <Multiselect
            v-model="filters.typeDoc"
            :options="typesOptions"
            placeholder="Sélectionner un type"
            label="label"
            track-by="value"
            :multiple="false"
          />
        </div>

        <!-- Boutons -->
        <div class="col-md-12 mt-3 d-flex justify-content-end">
          <button type="submit" class="btn btn-primary me-2">Appliquer les Filtres</button>
          <button type="button" class="btn btn-secondary" @click="resetFilters">Réinitialiser</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Multiselect from "@vueform/multiselect";

export default defineComponent({
  name: "FilterDocument",
  components: { Multiselect },
  props: {
    categoriesOptions: {
      type: Array,
      required: true,
    },
    typesOptions: {
      type: Array,
      required: true,
    },
  },
  setup(_, { emit }) {
    const filters = ref({
      dateFinConservation: "",
      categorie: null,
      typeDoc: null,
    });

    const applyFilters = () => {
      emit("filter-change", filters.value);
    };

    const resetFilters = () => {
      filters.value = {
        dateFinConservation: "",
        categorie: null,
        typeDoc: null,
      };
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
