<template>
  <AddModeleContrat />
</template>

<script lang="ts">
  import { defineComponent } from "vue";


import AddModeleContratModal from "@/components/GestionPaie/ModeleContrat/AddModeleContratModal.vue"

  export default defineComponent({
    name: "AddModeleContratPage",
    components: {
      AddModeleContratModal,
    },
  });
</script>