<template>
    <ListeAdresseLivraison/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeAdresseLivraison from "@/components/GesCom/AdresseLivraison/ListeAdresseLivraison.vue";

    export default defineComponent({
      name: "ListeAdresseLivraisonPage",
      components: {
        
        ListeAdresseLivraison,
      },
    });
  </script>