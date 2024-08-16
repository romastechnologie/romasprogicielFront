<template>
    <ListeLivraison/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeLivraison from "@/components/GesCom/Livraison/ListeLivraison.vue";

    export default defineComponent({
      name: "ListeLivraisonPage",
      components: {
        
        ListeLivraison,
      },
    });
  </script>