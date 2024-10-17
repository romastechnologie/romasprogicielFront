<template>
  <ListeDemandePermission />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeDemandePermission from "@/components/GestionPersonnel/Demandes/ListeDemandePermission.vue";

export default defineComponent({
  name: "ListeDemandePermissionPage",
  components: {
    ListeDemandePermission,
  },
});
</script>