<template>
    <ListeIts />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeIts from "@/components/GestionPaie/Its/ListeIts.vue";

  
    export default defineComponent({
      name: "ListeItsPage",
      components: {
        ListeIts,
      },
    });
  </script>