<template>
    <EditChampsLibre />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EditChampsLibre from "@/components/ChampsLibre/EditChampsLibre.vue";
  
    export default defineComponent({
      name: "EditChampsLibrePage",
      components: {
        EditChampsLibre,
      },
    });
  </script>