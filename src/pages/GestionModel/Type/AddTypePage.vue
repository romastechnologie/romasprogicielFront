<template>
    <AddType />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import AddType from "@/components/GestionModel/Type/AddTypeModal.vue";

  
    export default defineComponent({
      name: "AddTypePage",
      components: {
        AddType,
      },
    });
  </script>