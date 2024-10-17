<template>
    <ListeCongeCalendrier />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeConge from "@/components/GestionPersonnel/Conge/ListeConge.vue";
import ListeCongeCalendrier from "@/components/GestionPersonnel/Conge/ListeCongeCalendrier.vue";

  
    export default defineComponent({
      name: "ListeCongeCalendierPage",
      components: {
        ListeCongeCalendrier,
      },
    });
  </script>