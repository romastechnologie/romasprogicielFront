<template>
  <AddCircuitDemandeModal />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import AddCircuitDemandeModal from "@/components/GestionPersonnel/CircuitDemande/AddCircuitDemandeModal.vue";

  export default defineComponent({
    name: "AddCircuitDemandePage",
    components: {
      AddCircuitDemandeModal,
    },
  });
</script>