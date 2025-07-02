<template>
    <AddEmplacementModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    
    import  AddEmplacementModal from "@/components/GestionArchive/Emplacement/AddEmplacementModal.vue";

  
    export default defineComponent({
      name: "AddEmplacementPage",
      components: {
        AddEmplacementModal,
      },
    });
  </script>