<template>
    <EditJustificatif />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EditJustificatif from "@/components/GestionPersonnel/Justificatif/EditJustificatif.vue";

export default defineComponent({
    name: "EditJustificatifPage",
    components: {
        EditJustificatif,
    },
});
</script>