<template>
    <ListeRapport />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeRapport from "@/components/GestionMission/Rapport/ListeRapport.vue";

  
    export default defineComponent({
      name: "ListeRapportPage",
      components: {
        ListeRapport,
      },
    });
  </script>