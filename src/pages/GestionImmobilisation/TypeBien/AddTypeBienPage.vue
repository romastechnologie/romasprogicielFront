<template>
    <AddTypeBienModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import AddTypeBienModal from "@/components/GestionImmobilisation/TypeBien/AddTypeBienModal.vue";
  
    export default defineComponent({
      name: "AddTypeBienPage",
      components: {
        AddTypeBienModal,
      },
    });
  </script>