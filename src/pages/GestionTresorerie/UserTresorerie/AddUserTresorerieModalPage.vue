<template>
    <AddUserTresorerieModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddUserTresorerieModal from "@/components/GestionTresorerie/UserTresorerie/AddUserTresorerieModal.vue";

export default defineComponent({
      name: "AddUserTresorerieModalPage",
      components: {
        AddUserTresorerieModal,
      }
});

</script>