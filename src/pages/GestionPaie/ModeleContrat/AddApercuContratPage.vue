<template>
  <AddApercuContrat />
</template>
<script lang="ts">
  import { defineComponent } from "vue";
import AddApercuContrat from "@/components/GestionPaie/ModeleContrat/AddApercuContrat.vue"
  export default defineComponent({
    name: "AddApercuContratPage",
    components: {
      AddApercuContrat,
    },
  });
</script>