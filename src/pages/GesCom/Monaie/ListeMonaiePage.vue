<template>
    <ListeMonnaie/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeMonnaie from "@/components/GesCom/Monnaie/ListeMonnaie.vue";

    export default defineComponent({
      name: "ListeMonaiePage",
      components: {
        
        ListeMonnaie,
      },
    });
  </script>