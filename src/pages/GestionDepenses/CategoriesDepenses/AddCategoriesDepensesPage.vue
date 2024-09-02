<template>
  <AddCategoriesDepenses />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import AddCategoriesDepenses from "@/components/GestionDepenses/CategoriesDepenses/AddCategoriesDepensesModal.vue";


  export default defineComponent({
    name: "AddCategoriesDepensesPage",
    components: {
      AddCategoriesDepenses,
    },
  });
</script>