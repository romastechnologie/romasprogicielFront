<template>
    <AddBien />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import AddBien from "@/components/GestionImmobilisation/Bien/AddBien.vue";
  
    export default defineComponent({
      name: "AddBienPage",
      components: {
        AddBien,
      },
    });
  </script>