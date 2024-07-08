<template>
    <EditCategorieBien />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import EditCategorieBien from "@/components/GestionImmobilisation/CategorieBien/EditCategorieBien.vue";
  
    export default defineComponent({
      name: "EditCategorieBienPage",
      components: {
        EditCategorieBien,
      },
    });
  </script>