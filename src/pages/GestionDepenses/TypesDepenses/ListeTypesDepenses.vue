<template>
    <ListeTypesDepenses/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
  
import ListeTypesDepenses from "@/components/GestionDepenses/TypesDepenses/ListeTypesDepenses.vue";

    export default defineComponent({
      name: "ListeTypesDepensesPage",
      components: {
        
        ListeTypesDepenses,
      },
    });
  </script>


