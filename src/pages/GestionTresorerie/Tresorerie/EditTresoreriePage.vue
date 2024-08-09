<template>
      <EditTresorerie />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EditTresorerie from "@/components/GestionTresorerie/Tresorerie/EditTresorerie.vue";

export default defineComponent({
      name: "EditTresoreriePage",
      components: {
        EditTresorerie,
      },
});

</script>