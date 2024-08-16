<template>
    <EditCommandeClient />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditCommandeClient from "@/components/GesCom/CommandeClient/EditCommandeClient.vue";
  
    export default defineComponent({
      name: "EditCommandeClientPage",
      components: {
        
        EditCommandeClient,
      },
    });
  </script>