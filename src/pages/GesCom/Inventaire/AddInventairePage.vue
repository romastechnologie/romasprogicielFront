<template>
    <AddInventaire />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddInventaire from "@/components/GesCom/Inventaire/AddInventaire.vue";
  
    export default defineComponent({
      name: "AddInventairePage",
      components: {
        
        AddInventaire,
      },
    });
  </script>