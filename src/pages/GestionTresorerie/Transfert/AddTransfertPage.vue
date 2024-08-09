<template>
    <AddTransfert />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddTransfert from "@/components/GestionTresorerie/Transfert/AddTransfert.vue";

export default defineComponent({
      name: "AddTransfertPage",
      components: {
        AddTransfert,
      }
});

</script>