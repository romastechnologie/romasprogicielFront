<template>
    <AddDepenses />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddDepenses from "@/components/GestionDepenses/Depenses/AddDepenses.vue";
  
    export default defineComponent({
      name: "AddDepensesPage",
      components: {
        AddDepenses,
      },
    });
  </script>