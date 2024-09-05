<template>
  <AddTypeEmplacement />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

import AddTypeEmplacement from "@/components/GestionArchivages/TypeEmplacement/AddTypeEmplacementModal.vue";


  export default defineComponent({
    name: "AddTypeEmplacementPage",
    components: {
      AddTypeEmplacement,
    },
  });
</script>