<template>
    <AddFinance />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddFinance from "@/components/GestionTresorerie/Finance/AddFinance.vue";

export default defineComponent({
      name: "AddFinancePage",
      components: {
        AddFinance,
      }
});

</script>