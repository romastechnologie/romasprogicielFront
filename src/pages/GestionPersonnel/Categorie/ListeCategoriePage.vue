<template>
    <ListeCategorie />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeCategorie from "@/components/GestionPersonnel/Categorie/ListeCategorie.vue";

  
    export default defineComponent({
      name: "ListeCategoriePage",
      components: {
        ListeCategorie,
      },
    });
  </script>