<template>
    <ListeEcheances/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
  
import ListeEcheances from "@/components/GestionPersonnel/Echeance/ListeEcheances.vue";

    export default defineComponent({
      name: "ListeEcheancesPage",
      components: {
        
        ListeEcheances,
      },
    });
  </script>


