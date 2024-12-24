<template>
    <ListeUserTresorerie />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeUserTresorerie from "@/components/GestionTresorerie/UserTresorerie/ListeUserTresorerie.vue";

export default defineComponent({
      name: "ListeUserTresoreriePage",
      components: {
        ListeUserTresorerie,
      }
});

</script>