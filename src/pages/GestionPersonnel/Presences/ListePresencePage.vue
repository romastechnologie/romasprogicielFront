<template>
  <ListePresence />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListePresence from "@/components/GestionPersonnel/Presences/ListePresence.vue";

export default defineComponent({
  name: "ListePresencePage",
  components: {
    ListePresence,
  },
});
</script>