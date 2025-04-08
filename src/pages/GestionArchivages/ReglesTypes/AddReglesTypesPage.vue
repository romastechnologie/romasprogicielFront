<template>
  <AddReglesTypes />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import AddReglesTypes from "@/components/GestionArchivages/ReglesTypes/AddReglesTypesModal.vue";
  export default defineComponent({
    name: "AddReglesTypesPage",
    components: {
      AddReglesTypes,
    },
  });
</script>