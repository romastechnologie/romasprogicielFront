<template>
    <AddTagModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    
    import  AddTagModal from "@/components/GestionArchive/Tag/AddTagModal.vue";

  
    export default defineComponent({
      name: "AddTagPage",
      components: {
        AddTagModal,
      },
    });
  </script>