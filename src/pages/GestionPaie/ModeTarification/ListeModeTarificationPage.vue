<template>
    <ListeModeTarification />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeModeTarification from "@/components/GestionPaie/ModeTarification/ListeModeTarification.vue";

  
    export default defineComponent({
      name: "ListeModeTarificationPage",
      components: {
        ListeModeTarification,
      },
    });
  </script>