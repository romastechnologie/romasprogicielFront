<template>
    <ListeMouvement/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeMouvement from "@/components/GesCom/Mouvement/ListeMouvement.vue";

    export default defineComponent({
      name: "ListeMouvementPage",
      components: {
        
        ListeMouvement,
      },
    });
  </script>