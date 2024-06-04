<template>
    <AddTypeTresorerieModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddTypeTresorerieModal from "@/components/GestionTresorerie/TypeTresorerie/AddTypeTresorerieModal.vue";

export default defineComponent({
      name: "AddTypeTresorerieModalPage",
      components: {
        AddTypeTresorerieModal,
      }
});

</script>