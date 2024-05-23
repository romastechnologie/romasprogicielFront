<template>
    <ListeTypeConge />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeTypeConge from "@/components/GestionPersonnel/TypeConge/ListeTypeConge.vue";

  
    export default defineComponent({
      name: "ListeTypeCongePage",
      components: {
        ListeTypeConge,
      },
    });
  </script>