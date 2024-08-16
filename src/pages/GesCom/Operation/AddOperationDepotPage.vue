<template>
    <AddOperationDepot />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddOperationDepot from "@/components/GesCom/Operation/AddOperationDepot.vue";
  
    export default defineComponent({
      name: "AddOperationDepotPage",
      components: {
        
        AddOperationDepot,
      },
    });
  </script>