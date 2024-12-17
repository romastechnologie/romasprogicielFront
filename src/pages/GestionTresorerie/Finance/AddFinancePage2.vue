<template>
    <AddFinance2 />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddFinance2 from "@/components/GestionTresorerie/Finance/AddFinance2.vue";

export default defineComponent({
      name: "AddFinancePage2",
      components: {
        AddFinance2,
      }
});

</script>