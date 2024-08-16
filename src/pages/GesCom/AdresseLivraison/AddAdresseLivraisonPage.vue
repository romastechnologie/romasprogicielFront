<template>
    <AddAdresseLivraisonModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddAdresseLivraisonModal from "@/components/GesCom/AdresseLivraison/AddAdresseLivraisonModal.vue";
  
    export default defineComponent({
      name: "AddAdresseLivraisonPage",
      components: {
        
        AddAdresseLivraisonModal,
      },
    });
  </script>