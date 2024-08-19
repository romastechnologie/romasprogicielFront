<template>
    <AddReligion />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import AddReligion from "@/components/GestionPaie/Religion/AddReligionModal.vue";

  
    export default defineComponent({
      name: "AddReligionPage",
      components: {
        AddReligion,
      },
    });
  </script>