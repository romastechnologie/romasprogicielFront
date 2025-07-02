<template>
    <AddCircuit />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddCircuit from "@/components/GestionCircuit/Circuit/AddCircuit.vue";
  
    export default defineComponent({
      name: "AddCircuitPage",
      components: {
        
        AddCircuit,
      },
    });
  </script>