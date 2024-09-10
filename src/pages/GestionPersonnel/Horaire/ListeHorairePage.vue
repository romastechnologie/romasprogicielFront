<template>
    <ListeHoraire/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeHoraire from "@/components/GestionPersonnel/Horaire/ListeHoraire.vue";

    export default defineComponent({
      name: "ListeHorairePage",
      components: {
        ListeHoraire,
      },
    });
  </script>