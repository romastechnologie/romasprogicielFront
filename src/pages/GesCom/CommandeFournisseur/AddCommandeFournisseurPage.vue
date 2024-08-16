<template>
    <AddCommandeFournisseur />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddCommandeFournisseur from "@/components/GesCom/CommandeFournisseur/AddCommandeFournisseur.vue";
  
    export default defineComponent({
      name: "AddCommandeFournisseurPage",
      components: {
        
        AddCommandeFournisseur,
      },
    });
  </script>