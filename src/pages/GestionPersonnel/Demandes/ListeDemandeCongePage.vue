<template>
  <ListeDemandeConge />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeDemandeConge from "@/components/GestionPersonnel/Demandes/ListeDemandeConge.vue";

export default defineComponent({
  name: "ListeDemandeCongePage",
  components: {
    ListeDemandeConge,
  },
});
</script>