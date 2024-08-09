<template>
    <ListeConge />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeConge from "@/components/GestionPersonnel/Conge/ListeConge.vue";

  
    export default defineComponent({
      name: "ListeCongePage",
      components: {
        ListeConge,
      },
    });
  </script>