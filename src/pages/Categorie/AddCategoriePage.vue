<template>
    <AddCategorieModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddCategorieModal from "../../components/Categorie/AddCategorieModal.vue";
  
    export default defineComponent({
      name: "AddCategoriePage",
      components: {
        AddCategorieModal,
      },
    });
  </script>