<template>
    <AddMonnaieModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddMonnaieModal from "@/components/GestionTresorerie/Monnaie/AddMonnaieModal.vue";

export default defineComponent({
      name: "AddMonnaieModalPage",
      components: {
        AddMonnaieModal,
      }
});

</script>