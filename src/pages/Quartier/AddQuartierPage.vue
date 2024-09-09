<template>
    
    <AddQuartierModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddQuartierModal from "../../components/Quartier/AddQuartierModal.vue";
  
    export default defineComponent({
      name: "AddQuartierPage",
      components: {
        AddQuartierModal,
      },
    });
  </script>