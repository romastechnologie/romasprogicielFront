<template>
    <EditOperationRetrait />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditOperationRetrait from "@/components/GesCom/Operation/EditOperationRetrait.vue";
  
    export default defineComponent({
      name: "EditOperationRetraitPage",
      components: {
        
        EditOperationRetrait,
      },
    });
  </script>