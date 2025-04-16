<template>
  <AddTypeDoc />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

import AddTypeDoc from "@/components/GestionArchivages/TypeDoc/AddTypeDocModal.vue";


  export default defineComponent({
    name: "AddTypeDocPage",
    components: {
      AddTypeDoc,
    },
  });
</script>