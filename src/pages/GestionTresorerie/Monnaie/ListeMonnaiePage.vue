<template>
    <ListeMonnaie />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeMonnaie from "@/components/GestionTresorerie/Monnaie/ListeMonnaie.vue";

export default defineComponent({
      name: "ListeMonnaiePage",
      components: {
        ListeMonnaie,
      }
});

</script>