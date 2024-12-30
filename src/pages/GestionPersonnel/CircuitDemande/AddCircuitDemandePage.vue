<template>
    <AddCircuitDemande />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddCircuitDemande from "@/components/GestionPersonnel/CircuitDemande/AddCircuitDemande.vue";
  
    export default defineComponent({
      name: "AddCircuitDemandePage",
      components: {
        
        AddCircuitDemande,
      },
    });
  </script>