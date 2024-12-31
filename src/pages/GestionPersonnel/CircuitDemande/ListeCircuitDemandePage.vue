<template>
    <ListeCircuitDemande/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
 import ListeCircuitDemande from "@/components/GestionPersonnel/CircuitDemande/ListeCircuitDemande.vue";

    export default defineComponent({
      name: "ListeCircuitDemandePage",
      components: {
        
        ListeCircuitDemande,
      },
    });
  </script>