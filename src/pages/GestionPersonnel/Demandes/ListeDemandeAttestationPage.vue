<template>
  <ListeDemandeAttestation />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeDemandeAttestation from "@/components/GestionPersonnel/Demandes/ListeDemandeAttestation.vue";

export default defineComponent({
  name: "ListeDemandeAttestationPage",
  components: {
    ListeDemandeAttestation,
  },
});
</script>