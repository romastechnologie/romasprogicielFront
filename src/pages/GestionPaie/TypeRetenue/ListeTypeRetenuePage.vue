<template>
    <ListeTypeRetenue />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeTypeRetenue from "@/components/GestionPaie/TypeRetenue/ListeTypeRetenue.vue";

  
    export default defineComponent({
      name: "ListeTypeRetenuePage",
      components: {
        ListeTypeRetenue,
      },
    });
  </script>