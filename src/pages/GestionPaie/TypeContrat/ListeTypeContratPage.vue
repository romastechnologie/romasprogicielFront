<template>
    <ListeTypeContrat />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeTypeContrat from "@/components/GestionPaie/TypeContrat/ListeTypeContrat.vue";

  
    export default defineComponent({
      name: "ListeTypeContratPage",
      components: {
        ListeTypeContrat,
      },
    });
  </script>