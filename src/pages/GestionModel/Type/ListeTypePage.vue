<template>
    <ListeType />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeType from "@/components/GestionModel/Type/ListeType.vue";

  
    export default defineComponent({
      name: "ListeTypePage",
      components: {
        ListeType,
      },
    });
  </script>