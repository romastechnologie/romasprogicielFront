<template>
    <EditPlanificationReparation />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EditPlanificationReparation from "@/components/GestionPack/PlanificationReparation/EditPlanificationReparation.vue";
  
    export default defineComponent({
      name: "EditPlanificationReparationPage",
      components: {
        EditPlanificationReparation,
      },
    });
  </script>