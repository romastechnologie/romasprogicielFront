<template>
    <ViewCircuit/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ViewCircuit from "@/components/GestionCircuit/Circuit/ViewCircuit.vue";

    export default defineComponent({
      name: "ViewCircuitPage",
      components: {
        
        ViewCircuit,
      },
    });
  </script>