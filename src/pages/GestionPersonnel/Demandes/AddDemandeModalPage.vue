<template>
  <AddDemandeModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddDemandeModal from "@/components/GestionPersonnel/Demandes/AddDemandeModal.vue";

export default defineComponent({
  name: "AddDemandePage",
  components: {
    AddDemandeModal,
  },
});
</script>