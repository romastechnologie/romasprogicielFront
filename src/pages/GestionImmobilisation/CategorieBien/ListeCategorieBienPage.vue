<template>
    <ListeCategorieBien/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeCategorieBien from "@/components/GestionImmobilisation/CategorieBien/ListeCategorieBien.vue";

    export default defineComponent({
      name: "ListeCategorieBienPage",
      components: {
        ListeCategorieBien,
      },
    });
  </script>