<template>
    <AddTypeContratModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    
    import  AddTypeContratModal from "@/components/GestionPaie/TypeContrat/AddTypeContratModal.vue";

  
    export default defineComponent({
      name: "AddTypeContratPage",
      components: {
        AddTypeContratModal,
      },
    });
  </script>