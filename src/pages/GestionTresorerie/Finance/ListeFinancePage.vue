<template>
    <ListeFinance />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeFinance from "@/components/GestionTresorerie/Finance/ListeFinance.vue";

export default defineComponent({
      name: "ListeFinancePage",
      components: {
        ListeFinance,
      }
});

</script>