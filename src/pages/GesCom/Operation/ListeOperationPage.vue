<template>
    <ListeOperation/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeOperation from "@/components/GesCom/Operation/ListeOperation.vue";

    export default defineComponent({
      name: "ListeOperationPage",
      components: {
        
        ListeOperation,
      },
    });
  </script>