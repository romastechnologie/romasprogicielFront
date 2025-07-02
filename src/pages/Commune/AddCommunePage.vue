<template>
    <AddCommuneModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddCommuneModal from "../../components/Commune/AddCommuneModal.vue";
  
    export default defineComponent({
      name: "AddCommunePage",
      components: {
        AddCommuneModal,
      },
    });
  </script>