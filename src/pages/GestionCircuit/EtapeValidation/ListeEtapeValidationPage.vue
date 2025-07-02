<template>
    <ListeEtapeValidation/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ListeEtapeValidation from "@/components/GestionCircuit/EtapeValidation/ListeEtapeValidation.vue";

    export default defineComponent({
      name: "ListeEtapeValidationPage",
      components: {
        
        ListeEtapeValidation,
      },
    });
  </script>