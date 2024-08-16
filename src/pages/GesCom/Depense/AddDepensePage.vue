<template>
    <AddDepense />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddDepense from "@/components/GesCom/Depense/AddDepense.vue";
  
    export default defineComponent({
      name: "AddDepensePage",
      components: {
        
        AddDepense,
      },
    });
  </script>