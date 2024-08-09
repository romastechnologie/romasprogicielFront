<template>
    <AddTypeBien />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import AddTypeBien from "@/components/GestionImmobilisation/TypeBien/AddTypeBien.vue";
  
    export default defineComponent({
      name: "AddTypeBienPage",
      components: {
        AddTypeBien,
      },
    });
  </script>