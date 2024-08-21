<template>
    <ListePaie />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListePaie from "@/components/GestionPaie/Paie/ListePaie.vue";

  
    export default defineComponent({
      name: "ListePaiePage",
      components: {
        ListePaie,
      },
    });
  </script>