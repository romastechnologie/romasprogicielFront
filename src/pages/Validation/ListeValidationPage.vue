<template>
    <ListeValidation />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeValidation from "@/components/Validation/ListeValidation.vue";

  
    export default defineComponent({
      name: "ListeValidationPage",
      components: {
        ListeValidation,
      },
    });
  </script>