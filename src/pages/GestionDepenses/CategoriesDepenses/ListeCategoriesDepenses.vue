<template>
    <ListeCategoriesDepenses/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
  
import ListeCategoriesDepenses from "@/components/GestionDepenses/CategoriesDepenses/ListeCategoriesDepenses.vue";

    export default defineComponent({
      name: "ListeCategoriesDepensesPage",
      components: {
        
        ListeCategoriesDepenses,
      },
    });
  </script>


