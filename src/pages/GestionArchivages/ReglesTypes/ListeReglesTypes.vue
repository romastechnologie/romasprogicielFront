<template>
    <ListeReglesTypes/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
  
import ListeReglesTypes from "@/components/GestionDepenses/ReglesTypes/ListeReglesTypes.vue";

    export default defineComponent({
      name: "ListeReglesTypesPage",
      components: {
        
        ListeReglesTypes,
      },
    });
  </script>


