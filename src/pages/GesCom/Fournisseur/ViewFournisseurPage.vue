<template>
    <ViewFournisseur/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ViewFournisseur from "@/components/GesCom/Fournisseur/ViewFournisseur.vue";

    export default defineComponent({
      name: "ViewFournisseurPage",
      components: {
        
        ViewFournisseur,
      },
    });
  </script>