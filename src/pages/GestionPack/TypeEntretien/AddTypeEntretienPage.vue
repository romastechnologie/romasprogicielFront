<template>
    <AddTypeEntretien/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import AddTypeEntretien from "@/components/GestionPack/TypeEntretien/AddTypeEntretien.vue";
  
    export default defineComponent({
      name: "AddTypeEntretienPage",
      components: {
        AddTypeEntretien,
      },
    });
  </script>