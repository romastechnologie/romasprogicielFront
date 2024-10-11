<template>
    <AddPersonnelPoste />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import AddPersonnelPoste from "@/components/GesCom/PersonnelPoste/AddPersonnelPoste.vue";
  
    export default defineComponent({
      name: "AddPersonnelPostePage",
      components: {
        
        AddPersonnelPoste,
      },
    });
  </script>