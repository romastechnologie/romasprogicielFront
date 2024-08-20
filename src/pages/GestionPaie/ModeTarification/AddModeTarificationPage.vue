<template>
    <AddModeTarification />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import AddModeTarification from "@/components/GestionPaie/ModeTarification/AddModeTarification.vue";
  
    export default defineComponent({
      name: "AddModeTarificationPage",
      components: {
        AddModeTarification,
      },
    });
  </script>