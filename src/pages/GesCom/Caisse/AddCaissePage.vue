<template>
    <AddCaisse />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddCaisse from "@/components/GesCom/Caisse/AddCaisse.vue";
  
    export default defineComponent({
      name: "AddCaissePage",
      components: {
        
        AddCaisse,
      },
    });
  </script>