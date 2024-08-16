<template>
    <ListeInventaire/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeInventaire from "@/components/GesCom/Inventaire/ListeInventaire.vue";

    export default defineComponent({
      name: "ListeInventairePage",
      components: {
        
        ListeInventaire,
      },
    });
  </script>