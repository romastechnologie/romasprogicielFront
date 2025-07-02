<template>
    <AddMouvementModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    
    import  AddMouvementModal from "@/components/GestionArchive/Mouvement/AddMouvementModal.vue";

  
    export default defineComponent({
      name: "AddMouvementPage",
      components: {
        AddMouvementModal,
      },
    });
  </script>