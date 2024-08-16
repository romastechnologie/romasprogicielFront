<template>
    <AddTypeOperationModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddTypeOperationModal from "@/components/GesCom/TypeOperation/AddTypeOperationModal.vue";
  
    export default defineComponent({
      name: "AddTypeOperationPage",
      components: {
        
        AddTypeOperationModal,
      },
    });
  </script>