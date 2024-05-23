<template>
    <AddTypeCongeModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddTypeCongeModal from "@/components/GestionPersonnel/TypeConge/AddTypeCongeModal.vue";
  
    export default defineComponent({
      name: "AddTypeCongePage",
      components: {
        AddTypeCongeModal,
      },
    });
  </script>