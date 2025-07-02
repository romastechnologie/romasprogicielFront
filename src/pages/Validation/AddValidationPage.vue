<template>
    <AddValidationModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddValidationModal from "@/components/Validation/AddValidationModal.vue";
  
    export default defineComponent({
      name: "AddValidationPage",
      components: {
        AddValidationModal,
      },
    });
  </script>