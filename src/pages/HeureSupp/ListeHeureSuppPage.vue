<template>
    <ListeHeureSupp/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeHeureSupp from "../../components/HeureSupp/ListeHeureSupp.vue";

    export default defineComponent({
      name: "ListeHeureSuppPage",
      components: {
        ListeHeureSupp,
      },
    });
  </script>