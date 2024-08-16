<template>
    <AddCompte />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddCompte from "@/components/GesCom/Compte/AddCompte.vue";
  
    export default defineComponent({
      name: "AddComptePage",
      components: {
        
        AddCompte,
      },
    });
  </script>