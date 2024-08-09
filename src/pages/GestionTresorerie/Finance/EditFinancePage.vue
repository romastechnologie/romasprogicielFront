<template>
    <EditFinance />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EditFinance from "@/components/GestionTresorerie/Finance/EditFinance.vue";

export default defineComponent({
      name: "EditFinancePage",
      components: {
        EditFinance,
      }
});

</script>