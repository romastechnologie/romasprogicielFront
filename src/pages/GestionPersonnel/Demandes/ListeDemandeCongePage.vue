<template>
  <ListeDemandeConge />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeDemande from "@/components/GestionPersonnel/Demandes/ListeDemande.vue";
import ListeDemandeConge from "@/components/GestionPersonnel/Demandes/ListeDemandeConge.vue";

export default defineComponent({
  name: "ListeDemandeCongePage",
  components: {
    ListeDemandeConge,
  },
});
</script>