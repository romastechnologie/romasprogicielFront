<template>
    <EditEtapeValidation />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import EditEtapeValidation from "@/components/GestionCircuit/EtapeValidation/EditEtapeValidation.vue";
  
    export default defineComponent({
      name: "EditEtapeValidationPage",
      components: {
        
        EditEtapeValidation,
      },
    });
  </script>