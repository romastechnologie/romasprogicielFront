<template>
    <ListePoste />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListePoste from "@/components/GestionPersonnel/Poste/ListePoste.vue";

  
    export default defineComponent({
      name: "ListePostePage",
      components: {
        ListePoste,
      },
    });
  </script>