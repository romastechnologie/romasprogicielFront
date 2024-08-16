<template>
    <ListeCompte/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeCompte from "@/components/GesCom/Compte/ListeCompte.vue";

    export default defineComponent({
      name: "ListeComptePage",
      components: {
        
        ListeCompte,
      },
    });
  </script>