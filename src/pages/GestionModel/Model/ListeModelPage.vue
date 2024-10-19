<template>
    <ListeModel/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
 import ListeModel from "@/components/GestionModel/Model/ListeModel.vue";

    export default defineComponent({
      name: "ListeModelPage",
      components: {
        
        ListeModel,
      },
    });
  </script>