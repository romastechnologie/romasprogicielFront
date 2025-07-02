<template>
    <ListeFormat />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeFormat from "@/components/GestionArchive/Format/ListeFormat.vue";

  
    export default defineComponent({
      name: "ListeFormatPage",
      components: {
        ListeFormat,
      },
    });
  </script>