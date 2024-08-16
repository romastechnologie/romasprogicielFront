<template>
    <AddFournisseur />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddFournisseur from "@/components/GesCom/Fournisseur/AddFournisseur.vue";
  
    export default defineComponent({
      name: "AddFournisseurPage",
      components: {
        
        AddFournisseur,
      },
    });
  </script>