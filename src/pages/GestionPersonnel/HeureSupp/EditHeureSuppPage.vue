<template>
    <EditHeureSupp />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EditHeureSupp from "@/components/GestionPersonnel/HeureSupp/EditHeureSupp.vue";

export default defineComponent({
    name: "EditHeureSuppPage",
    components: {
        EditHeureSupp,
    },
});
</script>