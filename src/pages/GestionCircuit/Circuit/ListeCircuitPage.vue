<template>
    <ListeCircuit/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
 import ListeCircuit from "@/components/GestionCircuit/Circuit/ListeCircuit.vue";

    export default defineComponent({
      name: "ListeCircuitPage",
      components: {
        
        ListeCircuit,
      },
    });
  </script>