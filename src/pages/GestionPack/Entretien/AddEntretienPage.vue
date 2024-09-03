<template>
    <AddEntretien />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import AddEntretien from "@/components/GestionPack/Entretien/AddEntretien.vue";
  
    export default defineComponent({
      name: "AddEntretienPage",
      components: {
        AddEntretien,
      },
    });
  </script>