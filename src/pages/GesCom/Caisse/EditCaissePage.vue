<template>
    <EditCaisse />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditCaisse from "@/components/GesCom/Caisse/EditCaisse.vue";
  
    export default defineComponent({
      name: "EditCaissePage",
      components: {
        
        EditCaisse,
      },
    });
  </script>