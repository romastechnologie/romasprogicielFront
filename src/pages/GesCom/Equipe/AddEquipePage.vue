<template>
    <AddEquipe />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddEquipe from "@/components/GesCom/Equipe/AddEquipe.vue";
  
    export default defineComponent({
      name: "AddEquipePage",
      components: {
        AddEquipe,
      },
    });
  </script>