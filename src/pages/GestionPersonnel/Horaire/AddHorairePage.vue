<template>
    <AddHoraire/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddHoraire from "@/components/GestionPersonnel/Horaire/AddHoraire.vue";
  
    export default defineComponent({
      name: "AddHorairePage",
      components: {
        AddHoraire,
      },
    });
  </script>