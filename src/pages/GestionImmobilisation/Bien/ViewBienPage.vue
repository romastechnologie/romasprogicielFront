<template>
    <ViewBien/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import ViewBien from "@/components/GestionImmobilisation/Bien/ViewBien.vue";

    export default defineComponent({
      name: "ViewBienPage",
      components: {
        ViewBien,
      },
    });
  </script>