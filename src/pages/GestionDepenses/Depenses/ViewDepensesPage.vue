<template>
    <ViewDepenses />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import ViewDepenses from "@/components/GestionDepenses/Depenses/ViewDepenses.vue";
  
    export default defineComponent({
      name: "ViewDepensesPage",
      components: {
        ViewDepenses,
      },
    });
  </script>