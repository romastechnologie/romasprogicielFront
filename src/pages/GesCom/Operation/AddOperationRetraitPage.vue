<template>
    <AddOperationRetrait />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddOperationRetrait from "@/components/GesCom/Operation/AddOperationRetrait.vue";
  
    export default defineComponent({
      name: "AddOperationPage",
      components: {
        
        AddOperationRetrait,
      },
    });
  </script>