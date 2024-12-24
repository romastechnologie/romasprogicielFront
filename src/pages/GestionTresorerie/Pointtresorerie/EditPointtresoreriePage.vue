<template>
    <EditPointtresorerie />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EditPointtresorerie from "@/components/GestionTresorerie/Pointtresorerie/EditPointtresorerie.vue";

export default defineComponent({
    name: "EditPointtresoreriePage",
    components: {
      EditPointtresorerie,
    },
});

</script>