<template>
    <EditAmortissement />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EditAmortissement from "@/components/GestionImmobilisation/Amortissement/EditAmortissement.vue";
  
    export default defineComponent({
      name: "EditAmortissementPage",
      components: {
        EditAmortissement,
      },
    });
  </script>