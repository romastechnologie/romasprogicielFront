<template>
    <MiseAJourInventaire />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import MiseAJourInventaire from "@/components/GesCom/Inventaire/MiseAJourInventaire.vue";
  
    export default defineComponent({
      name: "MiseAJourInventairePage",
      components: {
        
        MiseAJourInventaire,
      },
    });
  </script>