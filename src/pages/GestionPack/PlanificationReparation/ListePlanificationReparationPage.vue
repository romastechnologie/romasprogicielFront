<template>
    <ListePlanificationReparation/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import ListePlanificationReparation from "@/components/GestionPack/PlanificationReparation/ListePlanificationReparation.vue";

    export default defineComponent({
      name: "ListePlanificationReparationPage",
      components: {
        ListePlanificationReparation,
      },
    });
  </script>