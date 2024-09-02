<template>
    <ListeDepenses/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
  
import ListeDepenses from "@/components/GestionDepenses/Depenses/ListeDepenses.vue";

    export default defineComponent({
      name: "ListeDepensesPage",
      components: {
        
        ListeDepenses,
      },
    });
  </script>


