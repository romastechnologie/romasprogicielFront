<template>
    <ViewEtapeValidation/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import ViewEtapeValidation from "@/components/GestionCircuit/EtapeValidation/WiewEtapeValidation.vue";
     
    export default defineComponent({
      name: "ViewEtapeValidationPage",
      components: {
        ViewEtapeValidation,
      },
    });
  </script>