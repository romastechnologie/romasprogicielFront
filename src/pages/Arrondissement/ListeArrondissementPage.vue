<template>
    <ListeArrondissement/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeArrondissement from "../../components/Arrondissement/ListeArrondissement.vue";

    export default defineComponent({
      name: "ListeArrondissementPage",
      components: {
        ListeArrondissement,
      },
    });
  </script>