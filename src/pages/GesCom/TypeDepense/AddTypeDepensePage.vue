<template>
    <AddTypeDepenseModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddTypeDepenseModal from "@/components/GesCom/TypeDepense/AddTypeDepenseModal.vue";
  
    export default defineComponent({
      name: "AddTypeDepensePage",
      components: {
        
        AddTypeDepenseModal,
      },
    });
  </script>