<template>
    <EditHoraire/>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EditHoraire from "@/components/GestionPersonnel/Horaire/EditHoraire.vue";

export default defineComponent({
    name: "EditHorairePage",
    components: {
        EditHoraire,
    },
});
</script>