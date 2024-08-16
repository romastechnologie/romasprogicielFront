<template>
    <ListeTypeOperation/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeTypeOperation from "@/components/GesCom/TypeOperation/ListeTypeOperation.vue";

    export default defineComponent({
      name: "ListeTypeOperationPage",
      components: {
        
        ListeTypeOperation,
      },
    });
  </script>