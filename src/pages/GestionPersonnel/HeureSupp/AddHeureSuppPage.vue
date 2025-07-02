<template>
    <AddHeureSuppModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddHeureSuppModal from "@/components/GestionPersonnel/HeureSupp/AddHeureSuppModal.vue";
  
    export default defineComponent({
      name: "AddHeureSuppPage",
      components: {
        AddHeureSuppModal,
      },
    });
  </script>