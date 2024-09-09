<template>
    <AddDepartementModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddDepartementModal from "../../components/Departement/AddDepartementModal.vue";
  
    export default defineComponent({
      name: "AddDepartementPage",
      components: {
        AddDepartementModal,
      },
    });
  </script>