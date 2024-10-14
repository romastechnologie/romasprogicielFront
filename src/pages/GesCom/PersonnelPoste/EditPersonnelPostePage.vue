<template>
    <EditPersonnelPoste />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import EditPersonnelPoste from "@/components/GesCom/PersonnelPoste/EditPersonnelPoste.vue";
  
    export default defineComponent({
      name: "EditPersonnelPostePage",
      components: {
        
        EditPersonnelPoste,
      },
    });
  </script>