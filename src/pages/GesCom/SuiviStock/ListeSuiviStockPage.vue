<template>
    <ListeSuiviStock/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeSuiviStock from "@/components/GesCom/SuiviStock/ListeSuiviStock.vue";

    export default defineComponent({
      name: "ListeSuiviStockPage",
      components: {
        
        ListeSuiviStock,
      },
    });
  </script>