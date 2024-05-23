<template>
    <EditConge />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EditConge from "@/components/GestionPersonnel/Conge/EditConge.vue";

export default defineComponent({
    name: "EditCongePage",
    components: {
        EditConge,
    },
});
</script>