<template>
    <ListeCommandeClient/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeCommandeClient from "@/components/GesCom/CommandeClient/ListeCommandeClient.vue";

    export default defineComponent({
      name: "ListeCommandeClientPage",
      components: {
        
        ListeCommandeClient,
      },
    });
  </script>