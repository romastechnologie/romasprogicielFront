<template>
    <AddPanneModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import AddPanneModal from "@/components/GestionPack/Panne/AddPanneModal.vue";
  
    export default defineComponent({
      name: "AddPannePage",
      components: {
        AddPanneModal,
      },
    });
  </script>