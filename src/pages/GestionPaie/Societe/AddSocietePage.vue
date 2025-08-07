<template>
    <AddSociete />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddSociete from "@/components/GestionPaie/Societe/AddSociete.vue";
  
    export default defineComponent({
      name: "AddSocietePage",
      components: {
        
        AddSociete,
      },
    });
  </script>