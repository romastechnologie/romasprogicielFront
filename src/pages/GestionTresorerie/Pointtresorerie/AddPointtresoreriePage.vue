<template>
    <AddPointtresorerie />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddPointtresorerie from "@/components/GestionTresorerie/Pointtresorerie/AddPointtresorerie.vue";

export default defineComponent({
      name: "AddPointtresoreriePage",
      components: {
        AddPointtresorerie,
      }
});

</script>