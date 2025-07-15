<template>
    <AddProcessus />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import AddProcessus from "@/components/GestionPaie/Processus/AddProcessus.vue";
  
    export default defineComponent({
      name: "AddProcessusPage",
      components: {
        AddProcessus,
      }
    });
  </script>