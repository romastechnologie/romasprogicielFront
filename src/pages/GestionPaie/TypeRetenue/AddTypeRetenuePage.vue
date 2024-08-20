<template>
    <AddTypeRetenueModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddTypeRetenueModal from "@/components/GestionPaie/TypeRetenue/AddTypeRetenueModal.vue";
  
    export default defineComponent({
      name: "AddTypeRetenuePage",
      components: {
        AddTypeRetenueModal,
      },
    });
  </script>