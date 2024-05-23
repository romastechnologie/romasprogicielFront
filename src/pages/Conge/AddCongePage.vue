<template>
    <AddConge />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddConge from "../../components/Conge/AddConge.vue";
  
    export default defineComponent({
      name: "AddCongePage",
      components: {
        AddConge,
      },
    });
  </script>