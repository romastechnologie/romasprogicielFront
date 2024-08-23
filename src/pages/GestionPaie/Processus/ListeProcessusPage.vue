<template>
    <ListeProcessus />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeProcessus from "@/components/GestionPaie/Processus/ListeProcessus.vue";

  
    export default defineComponent({
      name: "ListeProcessusPage",
      components: {
        ListeProcessus,
      },
    });
  </script>