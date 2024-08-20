<template>
    <ListeTypePrime />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeTypePrime from "@/components/GestionPaie/TypePrime/ListeTypePrime.vue";

  
    export default defineComponent({
      name: "ListeTypePrimePage",
      components: {
        ListeTypePrime,
      },
    });
  </script>