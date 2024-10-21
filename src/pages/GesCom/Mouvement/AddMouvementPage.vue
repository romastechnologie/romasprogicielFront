<template>
    <AddMouvement />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddMouvement from "@/components/GesCom/Mouvement/AddMouvement.vue";
  
    export default defineComponent({
      name: "AddMouvementPage",
      components: {
        AddMouvement,
      },
    });
  </script>