<template>
  <ListeDemandePermission />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeDemande from "@/components/GestionPersonnel/Demandes/ListeDemande.vue";
import ListeDemandePermission from "@/components/GestionPersonnel/Demandes/ListeDemandePermission.vue";

export default defineComponent({
  name: "ListeDemandePermissionPage",
  components: {
    ListeDemandePermission,
  },
});
</script>