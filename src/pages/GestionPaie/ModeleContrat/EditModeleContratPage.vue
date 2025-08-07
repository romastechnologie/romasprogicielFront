<template>
  <EditModeleContrat />
</template>
<script lang="ts">
  import { defineComponent } from "vue";
import EditModeleContrat from "@/components/GestionPaie/ModeleContrat/EditModeleContrat.vue"
  export default defineComponent({
    name: "EditModeleContratPage",
    components: {
      EditModeleContrat,
    },
  });
</script>