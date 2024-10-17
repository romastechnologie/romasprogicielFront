<template>
    <EditModel />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditModel from "@/components/GestionModel/Model/EditModel.vue";
  
    export default defineComponent({
      name: "EditModelPage",
      components: {
        
        EditModel,
      },
    });
  </script>