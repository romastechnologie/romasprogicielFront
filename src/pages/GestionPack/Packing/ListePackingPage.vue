<template>
    <ListePacking/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
  
import ListePacking from "@/components/GestionPack/Packing/ListePacking.vue";

    export default defineComponent({
      name: "ListePackingPage",
      components: {
        
        ListePacking,
      },
    });
  </script>


