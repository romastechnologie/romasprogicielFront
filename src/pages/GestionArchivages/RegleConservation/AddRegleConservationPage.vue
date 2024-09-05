<template>
  <AddRegleConservation />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import AddRegleConservation from "@/components/GestionArchivages/RegleConservation/AddRegleConservationModal.vue";


  export default defineComponent({
    name: "AddRegleConservationPage",
    components: {
      AddRegleConservation,
    },
  });
</script>