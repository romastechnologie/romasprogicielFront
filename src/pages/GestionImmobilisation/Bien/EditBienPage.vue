<template>
    <EditBien />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import EditBien from "@/components/GestionImmobilisation/Bien/EditBien.vue";
  
    export default defineComponent({
      name: "EditBienPage",
      components: {
        EditBien,
      },
    });
  </script>