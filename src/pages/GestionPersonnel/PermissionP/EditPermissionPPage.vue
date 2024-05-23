<template>
    <EditPermissionP />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EditPermissionP from "@/components/GestionPersonnel/PermissionP/EditPermissionP.vue";

export default defineComponent({
    name: "EditPermissionPPage",
    components: {
        EditPermissionP,
    },
});
</script>