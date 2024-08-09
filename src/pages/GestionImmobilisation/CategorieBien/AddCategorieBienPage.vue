<template>
    <AddCategorieBien />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import AddCategorieBien from "@/components/GestionImmobilisation/CategorieBien/AddCategorieBien.vue";
  
    export default defineComponent({
      name: "AddCategorieBienPage",
      components: {
        AddCategorieBien,
      },
    });
  </script>