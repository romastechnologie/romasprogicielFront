<template>
    <AddDepot />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddDepot from "@/components/GesCom/Depot/AddDepot.vue";
  
    export default defineComponent({
      name: "AddDepotPage",
      components: {
        
        AddDepot,
      },
    });
  </script>