<template>
    <ListePaiement/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListePaiement from "@/components/GesCom/Paiement/ListePaiement.vue";

    export default defineComponent({
      name: "ListePaiementPage",
      components: {
        
        ListePaiement,
      },
    });
  </script>