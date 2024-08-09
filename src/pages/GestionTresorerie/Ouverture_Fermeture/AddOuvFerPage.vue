<template>
    <AddOuvFer />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddOuvFer from "@/components/GestionTresorerie/Ouverture_Fermeture/AddOuvFer.vue";

export default defineComponent({
      name: "AddOuvFerPage",
      components: {
        AddOuvFer,
      }
});

</script>