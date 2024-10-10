<template>
    <AddPersonnelFonction />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddPersonnelFonction from "@/components/GesCom/PersonnelFonction/AddPersonnelPoste.vue";
  
    export default defineComponent({
      name: "AddPersonnelFonctionPage",
      components: {
        
        AddPersonnelFonction,
      },
    });
  </script>