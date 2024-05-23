<template>
    <EditPersonnel />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EditPersonnel from "@/components/GestionPersonnel/Personnels/EditPersonnel.vue";

export default defineComponent({
    name: "EditPersonnelPage",
    components: {
        EditPersonnel,
    },
});
</script>