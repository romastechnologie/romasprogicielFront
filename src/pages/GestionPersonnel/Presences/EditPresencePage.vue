<template>
    <EditPresence />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EditPresence from "@/components/GestionPersonnel/Presences/EditPresence.vue";

export default defineComponent({
    name: "EditPresencePage",
    components: {
        EditPresence,
    },
});
</script>