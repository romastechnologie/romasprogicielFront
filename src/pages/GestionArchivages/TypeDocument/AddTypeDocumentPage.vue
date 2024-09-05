<template>
  <AddTypeDocument />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

import AddTypeDocument from "@/components/GestionArchivages/TypeDocument/AddTypeDocumentModal.vue";


  export default defineComponent({
    name: "AddTypeDocumentPage",
    components: {
      AddTypeDocument,
    },
  });
</script>