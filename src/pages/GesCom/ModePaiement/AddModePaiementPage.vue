<template>
    <AddModePaiementModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddModePaiementModal from "@/components/GesCom/ModePaiement/AddModePaiementModal.vue";
  
    export default defineComponent({
      name: "AddModePaiementPage",
      components: {
        AddModePaiementModal,
      },
    });
  </script>