<template>
    <AddLivraison />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddLivraison from "@/components/GesCom/Livraison/AddLivraison.vue";
  
    export default defineComponent({
      name: "AddLivraisonPage",
      components: {
        
        AddLivraison,
      },
    });
  </script>