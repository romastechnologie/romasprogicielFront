<template>
    <AddCommandeClient />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddCommandeClient from "@/components/GesCom/CommandeClient/AddCommandeClient.vue";
  
    export default defineComponent({
      name: "AddCommandeClientPage",
      components: {
        
        AddCommandeClient,
      },
    });
  </script>