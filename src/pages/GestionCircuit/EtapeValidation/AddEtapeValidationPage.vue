<template>
    <AddEtapeValidation />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddEtapeValidation from "@/components/GestionCircuit/EtapeValidation/AddEtapeValidation.vue";
  
    export default defineComponent({
      name: "AddEtapeValidationPage",
      components: {
        
        AddEtapeValidation,
      },
    });
  </script>