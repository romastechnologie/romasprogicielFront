<template>
    <AddUserCompteModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddUserCompteModal from "@/components/GestionTresorerie/UserCompte/AddUserCompteModal.vue";

export default defineComponent({
      name: "AddUserCompteModalPage",
      components: {
        AddUserCompteModal,
      }
});

</script>