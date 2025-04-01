<template>
  <AddReglesTypes />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import AddCategoriesDepenses from "@/components/GestionDepenses/ReglesTypes/AddReglesTypesModal.vue";


  export default defineComponent({
    name: "AddReglesTypesPage",
    components: {
      AddReglesTypes,
    },
  });
</script>