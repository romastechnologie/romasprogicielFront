<template>
    <ListeReligion />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeReligion from "@/components/GestionPaie/Religion/ListeReligion.vue";

  
    export default defineComponent({
      name: "ListeReligionPage",
      components: {
        ListeReligion,
      },
    });
  </script>