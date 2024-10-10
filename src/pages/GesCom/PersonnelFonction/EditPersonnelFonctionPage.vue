<template>
    <EditPersonnelFonction />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditPersonnelFonction from "@/components/GesCom/PersonnelFonction/EditPersonnelPoste.vue";
  
    export default defineComponent({
      name: "EditPersonnelFonctionPage",
      components: {
        
        EditPersonnelFonction,
      },
    });
  </script>