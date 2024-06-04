<template>
    <AddTresorerie />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddTresorerie from "@/components/GestionTresorerie/Tresorerie/AddTresorerie.vue";

export default defineComponent({
      name: "AddTresoreriePage",
      components: {
        AddTresorerie,
      }
});

</script>