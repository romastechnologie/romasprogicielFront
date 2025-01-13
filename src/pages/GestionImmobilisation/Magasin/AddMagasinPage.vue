<template>
    <AddMagasinModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import AddMagasinModal from "@/components/GestionImmobilisation/Magasin/AddMagasinModal.vue";
  
    export default defineComponent({
      name: "AddMagasinPage",
      components: {
        AddMagasinModal,
      },
    });
  </script>