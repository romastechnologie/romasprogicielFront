<template>
    <ListeCommune/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeCommune from "../../components/Commune/ListeCommune.vue";

    export default defineComponent({
      name: "ListeCommunePage",
      components: {
        ListeCommune,
      },
    });
  </script>