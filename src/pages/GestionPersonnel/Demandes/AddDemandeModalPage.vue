<template>
  <AddDemande />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddDemande from "@/components/GestionPersonnel/Demandes/AddDemande.vue";

export default defineComponent({
  name: "AddDemandePage",
  components: {
    AddDemande,
  },
});
</script>