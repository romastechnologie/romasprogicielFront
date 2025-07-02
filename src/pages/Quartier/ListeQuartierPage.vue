<template>
    <ListeQuartier/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeQuartier from "../../components/Quartier/ListeQuartier.vue";

    export default defineComponent({
      name: "ListeQuartierPage",
      components: {
       
        ListeQuartier,
      },
    });
  </script>