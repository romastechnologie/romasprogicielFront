<template>
    <AddFer/>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddFer from "@/components/GestionTresorerie/Ouverture_Fermeture/AddFer.vue";

export default defineComponent({
      name: "AddFerPage",
      components: {
        AddFer,
      }
});

</script>