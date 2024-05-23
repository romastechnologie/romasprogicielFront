<template>
    <AddJustificatif />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddJustificatif from "../../components/Justificatif/AddJustificatif.vue";
  
    export default defineComponent({
      name: "AddJustificatifPage",
      components: {
        AddJustificatif,
      },
    });
  </script>