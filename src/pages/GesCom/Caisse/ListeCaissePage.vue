<template>
    <ListeCaisse/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeCaisse from "@/components/GesCom/Caisse/ListeCaisse.vue";

    export default defineComponent({
      name: "ListeCaissePage",
      components: {
        
        ListeCaisse,
      },
    });
  </script>