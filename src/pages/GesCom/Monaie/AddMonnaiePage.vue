<template>
    <AddMonnaieModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddMonnaieModal from "@/components/GesCom/Monnaie/AddMonnaieModal.vue";
  
    export default defineComponent({
      name: "AddMonnaiePage",
      components: {
        
        AddMonnaieModal,
      },
    });
  </script>