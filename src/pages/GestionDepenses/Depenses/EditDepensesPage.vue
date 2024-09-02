<template>
    <EditDepenses />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EditDepenses from "@/components/GestionDepenses/Depenses/EditDepenses.vue";
  
    export default defineComponent({
      name: "EditDepensesPage",
      components: {
        EditDepenses,
      },
    });
  </script>