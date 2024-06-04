<template>
    <ListeOuvFer />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeOuvFer from "@/components/GestionTresorerie/Ouverture_Fermeture/ListeOuvFer.vue";

export default defineComponent({
      name: "ListeOuvFerPage",
      components: {
        ListeOuvFer,
      }
});

</script>