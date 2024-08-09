<template>
  <ListeDemande />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeDemande from "@/components/GestionPersonnel/Demandes/ListeDemande.vue";

export default defineComponent({
  name: "ListeDemandePage",
  components: {
    ListeDemande,
  },
});
</script>