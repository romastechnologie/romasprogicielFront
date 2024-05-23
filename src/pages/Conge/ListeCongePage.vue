<template>
    <ListeConge />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeConge from "../../components/Conge/ListeConge.vue";

  
    export default defineComponent({
      name: "ListeCongePage",
      components: {
        ListeConge,
      },
    });
  </script>