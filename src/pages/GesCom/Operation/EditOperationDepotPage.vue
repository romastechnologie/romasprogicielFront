<template>
    <EditOperationDepot />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditOperationDepot from "@/components/GesCom/Operation/EditOperationDepot.vue";
  
    export default defineComponent({
      name: "EditOperationDepotPage",
      components: {
        
        EditOperationDepot,
      },
    });
  </script>