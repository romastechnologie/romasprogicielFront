<template>
    <AddPosteModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddPosteModal from "@/components/GestionPersonnel/Poste/AddPosteModal.vue";
  
    export default defineComponent({
      name: "AddPostePage",
      components: {
        AddPosteModal,
      },
    });
  </script>