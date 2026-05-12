<template>
    <TableauAmortissement/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import TableauAmortissement from "@/components/GestionImmobilisation/Amortissement/TableauAmortissement.vue";

    export default defineComponent({
      name: "TableauAmortissementPage",
      components: {
        TableauAmortissement,
      },
    });
  </script>