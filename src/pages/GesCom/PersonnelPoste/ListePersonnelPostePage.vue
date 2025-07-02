<template>
    <ListePersonnelPoste/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ListePersonnelPoste from "@/components/GesCom/PersonnelPoste/ListePersonnelPoste.vue";

    export default defineComponent({
      name: "ListePersonnelPostePage",
      components: {
        
        ListePersonnelPoste,
      },
    });
  </script>