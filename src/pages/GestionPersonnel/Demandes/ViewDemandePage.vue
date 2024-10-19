<template>
  <ViewDemande />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ViewDemande from "@/components/GestionPersonnel/Demandes/ViewDemande.vue";

export default defineComponent({
  name: "ViewDemandePage",
  components: {
    ViewDemande,
  },
});
</script>