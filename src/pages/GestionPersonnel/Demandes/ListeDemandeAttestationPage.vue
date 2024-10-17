<template>
  <ListeDemandeAttestation />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeDemande from "@/components/GestionPersonnel/Demandes/ListeDemande.vue";
import ListeDemandeAttestation from "@/components/GestionPersonnel/Demandes/ListeDemandeAttestation.vue";

export default defineComponent({
  name: "ListeDemandeAttestationPage",
  components: {
    ListeDemandeAttestation,
  },
});
</script>