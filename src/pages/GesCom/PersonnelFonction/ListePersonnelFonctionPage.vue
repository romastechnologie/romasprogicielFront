<template>
    <ListePersonnelFonction/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListePersonnelFonction from "@/components/GesCom/PersonnelFonction/ListePersonnelPoste.vue";

    export default defineComponent({
      name: "ListePersonnelFonctionPage",
      components: {
        
        ListePersonnelFonction,
      },
    });
  </script>