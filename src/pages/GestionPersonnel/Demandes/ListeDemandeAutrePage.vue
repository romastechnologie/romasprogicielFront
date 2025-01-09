<template>
  <ListeDemandeAutre />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeDemandeAutre from "@/components/GestionPersonnel/Demandes/ListeDemandeAutre.vue";

export default defineComponent({
  name: "ListeDemandeAutrePage",
  components: {
    ListeDemandeAutre,
  },
});
</script>