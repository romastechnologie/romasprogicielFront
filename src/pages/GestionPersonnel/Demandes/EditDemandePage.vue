<template>
    <EditDemande />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import EditDemande from "@/components/GestionPersonnel/Demandes/EditDemande.vue";
  
    export default defineComponent({
      name: "EditDemandePage",
      components: {
        EditDemande,
      },
    });
  </script>