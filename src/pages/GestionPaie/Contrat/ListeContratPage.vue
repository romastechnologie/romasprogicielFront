<template>
    <ListeContrat />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeContrat from "@/components/GestionPaie/Contrat/ListeContrat.vue";

  
    export default defineComponent({
      name: "ListeContratPage",
      components: {
        ListeContrat,
      },
    });
  </script>