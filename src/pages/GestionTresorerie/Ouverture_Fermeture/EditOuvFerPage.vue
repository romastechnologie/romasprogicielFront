<template>
    <EditOuvFer />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EditOuvFer from "@/components/GestionTresorerie/Ouverture_Fermeture/EditOuvFer.vue";

export default defineComponent({
      name: "EditOuvFerPage",
      components: {
        EditOuvFer,
      }
});

</script>