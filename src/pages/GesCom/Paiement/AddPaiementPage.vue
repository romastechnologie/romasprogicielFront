<template>
    <AddPaiement />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddPaiement from "@/components/GesCom/Paiement/AddPaiement.vue";
  
    export default defineComponent({
      name: "AddPaiementPage",
      components: {
        
        AddPaiement,
      },
    });
  </script>