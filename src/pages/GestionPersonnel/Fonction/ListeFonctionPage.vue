<template>
    <ListeFonction />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeFonction from "@/components/GestionPersonnel/Fonction/ListeFonction.vue";

  
    export default defineComponent({
      name: "ListeFonctionPage",
      components: {
        ListeFonction,
      },
    });
  </script>