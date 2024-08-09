<template>
  <ListeTresorerie />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
 import ListeTresorerie from "@/components/GestionTresorerie/Tresorerie/ListeTresorerie.vue";

  export default defineComponent({
    name: "EditTresoreriePage",
    components: {
      ListeTresorerie,
    },
  });

</script>