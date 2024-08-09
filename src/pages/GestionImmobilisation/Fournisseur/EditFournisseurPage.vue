<template>
    <EditFournisseur />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    
    import EditFournisseur from "@/components/GestionImmobilisation/Fournisseur/EditFournisseur.vue";
    export default defineComponent({
      name: "EditFournisseurPage",
      components: {
        EditFournisseur,
      },
    });
  </script>