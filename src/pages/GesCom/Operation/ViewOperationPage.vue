<template>
    <ViewOperation />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ViewOperation from "@/components/GesCom/Operation/ViewOperation.vue";
  
    export default defineComponent({
      name: "ViewOperationPage",
      components: {
        
        ViewOperation,
      },
    });
  </script>