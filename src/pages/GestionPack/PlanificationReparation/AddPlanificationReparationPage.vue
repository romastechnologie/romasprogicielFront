<template>
  <AddPlanificationReparation/>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import AddPlanificationReparation from "@/components/GestionPack/PlanificationReparation/AddPlanificationReparation.vue";

  export default defineComponent({
    name: "AddPlanificationReparationPage",
    components: {
      AddPlanificationReparation,
    },
  });
</script>