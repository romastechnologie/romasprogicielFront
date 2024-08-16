<template>
    <ListeFournisseur/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeFournisseur from "@/components/GesCom/Fournisseur/ListeFournisseur.vue";

    export default defineComponent({
      name: "ListeFournisseurPage",
      components: {
        
        ListeFournisseur,
      },
    });
  </script>