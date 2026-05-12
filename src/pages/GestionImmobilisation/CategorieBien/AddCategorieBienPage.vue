<template>
    <AddCategorieBienModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import AddCategorieBienModal from "@/components/GestionImmobilisation/CategorieBien/AddCategorieBienModal.vue";
  
    export default defineComponent({
      name: "AddCategorieBienPage",
      components: {
        AddCategorieBienModal,
      },
    });
  </script>