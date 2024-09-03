<template>
    <EditEntretien />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EditEntretien from "@/components/GestionPack/Entretien/EditEntretien.vue";
  
    export default defineComponent({
      name: "EditEntretienPage",
      components: {
        EditEntretien,
      },
    });
  </script>