<template>
  <AddTypesDepenses />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import AddTypesDepenses from "@/components/GestionDepenses/TypesDepenses/AddTypesDepensesModal.vue";


  export default defineComponent({
    name: "AddTypesDepensesPage",
    components: {
      AddTypesDepenses,
    },
  });
</script>