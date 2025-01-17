<template>
    <PointFinance />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PointFinance from "@/components/GestionTresorerie/Finance/PointFinance.vue";

export default defineComponent({
      name: "PointFinancePage",
      components: {
        PointFinance,
      }
});

</script>