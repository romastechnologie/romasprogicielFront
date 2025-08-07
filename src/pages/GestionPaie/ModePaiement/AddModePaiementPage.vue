<template>
    <AddModePaiement />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import AddModePaiement from "@/components/GestionPaie/ModePaiement/AddModePaiementModal.vue";

  
    export default defineComponent({
      name: "AddModePaiementPage",
      components: {
        AddModePaiement,
      },
    });
  </script>