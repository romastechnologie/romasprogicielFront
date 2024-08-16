<template>
    <EditCompte />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditCompte from "@/components/GesCom/Compte/EditCompte.vue";
  
    export default defineComponent({
      name: "EditComptePage",
      components: {
        
        EditCompte,
      },
    });
  </script>