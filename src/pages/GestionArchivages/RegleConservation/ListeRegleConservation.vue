<template>
    <ListeRegleConservation/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
  
import ListeRegleConservation from "@/components/GestionArchivages/RegleConservation/ListeRegleConservation.vue";

    export default defineComponent({
      name: "ListeRegleConservationPage",
      components: {
        
        ListeRegleConservation,
      },
    });
  </script>


