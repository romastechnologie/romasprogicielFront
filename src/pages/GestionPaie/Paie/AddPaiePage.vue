<template>
    <AddPaie />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import AddPaie from "@/components/GestionPaie/Paie/AddPaie.vue";

  
    export default defineComponent({
      name: "AddPaiePage",
      components: {
        AddPaie,
      },
    });
  </script>