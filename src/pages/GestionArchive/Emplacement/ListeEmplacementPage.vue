<template>
    <ListeEmplacement />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeEmplacement from "@/components/GestionArchive/Emplacement/ListeEmplacement.vue";

  
    export default defineComponent({
      name: "ListeEmplacementPage",
      components: {
        ListeEmplacement,
      },
    });
  </script>