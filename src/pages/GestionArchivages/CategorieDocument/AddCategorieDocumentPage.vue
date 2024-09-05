<template>
  <AddCategorieDocument />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import AddCategorieDocument from "@/components/GestionArchivages/CategorieDocument/AddCategorieDocumentModal.vue";


  export default defineComponent({
    name: "AddCategorieDocumentPage",
    components: {
      AddCategorieDocument,
    },
  });
</script>