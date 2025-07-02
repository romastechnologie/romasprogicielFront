<template>
    <AddTypePrimeModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    
    import  AddTypePrimeModal from "@/components/GestionPaie/TypePrime/AddTypePrimeModal.vue";

  
    export default defineComponent({
      name: "AddTypePrimePage",
      components: {
        AddTypePrimeModal,
      },
    });
  </script>