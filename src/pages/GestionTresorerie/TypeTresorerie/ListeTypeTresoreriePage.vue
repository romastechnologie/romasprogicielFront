<template>
    <ListeTypeTresorerie />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeTypeTresorerie from "@/components/GestionTresorerie/TypeTresorerie/ListeTypeTresorerie.vue";

export default defineComponent({
      name: "ListeTresoreriePage",
      components: {
        ListeTypeTresorerie,
      }
});

</script>