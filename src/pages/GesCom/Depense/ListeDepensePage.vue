<template>
    <ListeDepense/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeDepense from "@/components/GesCom/Depense/ListeDepense.vue";

    export default defineComponent({
      name: "ListeDepensePage",
      components: {
        
        ListeDepense,
      },
    });
  </script>