<template>
    <AddArrondissementModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddArrondissementModal from "../../components/Arrondissement/AddArrondissementModal.vue";
  
    export default defineComponent({
      name: "AddArrondissementPage",
      components: {
        AddArrondissementModal,
      },
    });
  </script>