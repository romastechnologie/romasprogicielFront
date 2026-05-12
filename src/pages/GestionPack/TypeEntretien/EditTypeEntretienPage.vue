<template>
    <EditTypeEntretien/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EditTypeEntretien from "@/components/GestionPack/TypeEntretien/EditTypeEntretien.vue";
  
    export default defineComponent({
      name: "EditTypeEntretienPage",
      components: {
        EditTypeEntretien,
      },
    });
  </script>