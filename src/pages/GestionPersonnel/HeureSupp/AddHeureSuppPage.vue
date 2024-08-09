<template>
    <AddHeureSupp />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddHeureSupp from "@/components/GestionPersonnel/HeureSupp/AddHeureSupp.vue";
  
    export default defineComponent({
      name: "AddHeureSuppPage",
      components: {
        AddHeureSupp,
      },
    });
  </script>