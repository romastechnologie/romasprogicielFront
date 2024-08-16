<template>
    <EditPaiement />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditPaiement from "@/components/GesCom/Paiement/EditPaiement.vue";
  
    export default defineComponent({
      name: "EditPaiementPage",
      components: {
        
        EditPaiement,
      },
    });
  </script>