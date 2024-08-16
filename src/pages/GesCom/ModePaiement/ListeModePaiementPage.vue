<template>
    <ListeModePaiement/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeModePaiement from "@/components/GesCom/ModePaiement/ListeModePaiement.vue";

    export default defineComponent({
      name: "ListeModePaiementPage",
      components: {
        
        ListeModePaiement,
      },
    });
  </script>