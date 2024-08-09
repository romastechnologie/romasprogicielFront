<template>
    <ListeAmortissement/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import ListeAmortissement from "@/components/GestionImmobilisation/Amortissement/ListeAmortissement.vue";

    export default defineComponent({
      name: "ListeAmortissementPage",
      components: {
        ListeAmortissement,
      },
    });
  </script>