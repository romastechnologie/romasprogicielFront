<template>
    <EditPersonnelFonction />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditPersonnelFonction from "@/components/GesCom/PersonnelFonction/EditPersonnelFonction.vue";
  
    export default defineComponent({
      name: "EditPersonnelFonctionPage",
      components: {
        
        EditPersonnelFonction,
      },
    });
  </script>