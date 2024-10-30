<template>
    <Calendrier />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import Calendrier from "@/components/GestionPersonnel/Conge/Calendrier.vue";

  
    export default defineComponent({
      name: "CalendrierPage",
      components: {
        Calendrier,
      },
    });
  </script>