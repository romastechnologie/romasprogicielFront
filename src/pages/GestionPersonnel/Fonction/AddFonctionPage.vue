<template>
    <AddFonctionModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddFonctionModal from "@/components/GestionPersonnel/Fonction/AddFonctionModal.vue";
  
    export default defineComponent({
      name: "AddFonctionPage",
      components: {
        AddFonctionModal,
      },
    });
  </script>