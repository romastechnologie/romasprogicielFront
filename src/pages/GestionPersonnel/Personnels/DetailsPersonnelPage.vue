<template>
  <DetailsPersonnel />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import DetailsPersonnel from "@/components/GestionPersonnel/Personnels/DetailsPersonnel.vue";

export default defineComponent({
  name: "DetailsPersonnelPage",
  components: {
    DetailsPersonnel,
  },
});
</script>