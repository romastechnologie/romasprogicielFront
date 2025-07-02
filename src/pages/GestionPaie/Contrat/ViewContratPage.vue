<template>
    <ViewContrat/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ViewContrat from "@/components/GestionPaie/Contrat/ViewContrat.vue";

    export default defineComponent({
      name: "ViewContratPage",
      components: {
        
        ViewContrat,
      },
    });
  </script>