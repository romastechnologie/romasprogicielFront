<template>
    <AddDemandePrix />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddDemandePrix from "@/components/GesCom/DemandePrix/AddDemandePrix.vue";
  
    export default defineComponent({
      name: "AddFamillePage",
      components: {
        
        AddDemandePrix,
      },
    });
  </script>