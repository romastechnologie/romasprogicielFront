<template>
  <ListeDemandePret />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeDemandePret from "@/components/GestionPersonnel/Demandes/ListeDemandePret.vue";

export default defineComponent({
  name: "ListeDemandePretPage",
  components: {
    ListeDemandePret,
  },
});
</script>