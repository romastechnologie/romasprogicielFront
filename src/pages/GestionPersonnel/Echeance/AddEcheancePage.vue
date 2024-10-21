<template>
  <AddEcheanceModal />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

import AddEcheanceModal from "@/components/GestionPersonnel/Echeance/AddEcheanceModal.vue";


  export default defineComponent({
    name: "AddEcheancePage",
    components: {
      AddEcheanceModal,
    },
  });
</script>