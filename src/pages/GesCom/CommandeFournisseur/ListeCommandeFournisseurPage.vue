<template>
    <ListeCommandeFournisseur/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeCommandeFournisseur from "@/components/GesCom/CommandeFournisseur/ListeCommandeFournisseur.vue";

    export default defineComponent({
      name: "ListeCommandeFournisseurPage",
      components: {
        
        ListeCommandeFournisseur,
      },
    });
  </script>