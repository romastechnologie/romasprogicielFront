<template>
    <ListeBien/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import ListeBien from "@/components/GestionImmobilisation/Bien/ListeBien.vue";

    export default defineComponent({
      name: "ListeBienPage",
      components: {
        ListeBien,
      },
    });
  </script>