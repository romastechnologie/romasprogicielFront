<template>
    <ListeDepot/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeDepot from "@/components/GesCom/Depot/ListeDepot.vue";

    export default defineComponent({
      name: "ListeDepotPage",
      components: {
        
        ListeDepot,
      },
    });
  </script>