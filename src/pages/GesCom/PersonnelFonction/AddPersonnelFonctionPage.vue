<template>
    <AddPersonnelFonction />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddPersonnelFonction from "@/components/GesCom/PersonnelFonction/AddPersonnelFonction.vue";
  
    export default defineComponent({
      name: "AddPersonnelFonctionPage",
      components: {
        
        AddPersonnelFonction,
      },
    });
  </script>