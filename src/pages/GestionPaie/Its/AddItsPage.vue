<template>
    <AddItsModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    
    import  AddItsModal from "@/components/GestionPaie/Its/AddItsModal.vue";

  
    export default defineComponent({
      name: "AddItsPage",
      components: {
        AddItsModal,
      },
    });
  </script>