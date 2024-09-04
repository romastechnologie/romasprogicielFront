<template>
    <AddFormatModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    
    import  AddFormatModal from "@/components/GestionArchive/Format/AddFormatModal.vue";

  
    export default defineComponent({
      name: "AddFormatPage",
      components: {
        AddFormatModal,
      },
    });
  </script>