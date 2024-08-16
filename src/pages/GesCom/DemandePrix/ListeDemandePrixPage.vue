<template>
    <ListeDemandePrix/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeDemandePrix from "@/components/GesCom/DemandePrix/ListeDemandePrix.vue";

    export default defineComponent({
      name: "ListeDemandePrixPage",
      components: {
        
        ListeDemandePrix,
      },
    });
  </script>