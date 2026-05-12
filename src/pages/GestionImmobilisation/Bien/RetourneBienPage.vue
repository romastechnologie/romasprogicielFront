<template>
    <RetourneBien/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import RetourneBien from "@/components/GestionImmobilisation/Bien/RetourneBien.vue";

    export default defineComponent({
      name: "RetourneBienPage",
      components: {
        RetourneBien,
      },
    });
  </script>