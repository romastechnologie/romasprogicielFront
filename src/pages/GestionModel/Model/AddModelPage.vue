<template>
    <AddModel />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddModel from "@/components/GestionModel/Model/AddModel.vue";
  
    export default defineComponent({
      name: "AddModelPage",
      components: {
        
        AddModel,
      },
    });
  </script>