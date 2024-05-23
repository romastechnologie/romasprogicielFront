<template>
  <AddPersonnel />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddPersonnel from "@/components/GestionPersonnel/Personnels/AddPersonnel.vue";

export default defineComponent({
  name: "AddPersonnelPage",
  components: {
    AddPersonnel,
  },
});
</script>