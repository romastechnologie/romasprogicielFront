<template>
  <AddUserEtapes />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

import AddUserEtapesModal from "@/components/GestionCircuit/UserEtapes/AddUserEtapesModal.vue";


  export default defineComponent({
    name: "AddUserEtapesPage",
    components: {
      AddUserEtapesModal,
    },
  });
</script>