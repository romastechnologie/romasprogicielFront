<template>
    <MiseAJourInventaire />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import MiseAJourInventaire from "@/components/GesCom/Inventaire/MiseAjourInventaire.vue";
  
    export default defineComponent({
      name: "MiseAJourInventairePage",
      components: {
        
        MiseAJourInventaire,
      },
    });
  </script>