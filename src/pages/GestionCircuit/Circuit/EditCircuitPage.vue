<template>
    <EditCircuit />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditCircuit from "@/components/GestionCircuit/Circuit/EditCircuit.vue";
  
    export default defineComponent({
      name: "EditCircuitPage",
      components: {
        
        EditCircuit,
      },
    });
  </script>