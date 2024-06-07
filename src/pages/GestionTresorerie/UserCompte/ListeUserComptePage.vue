<template>
    <ListeUserCompte />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeUserCompte from "@/components/GestionTresorerie/UserCompte/ListeUserCompte.vue";

export default defineComponent({
      name: "ListeUserComptePage",
      components: {
        ListeUserCompte,
      }
});

</script>