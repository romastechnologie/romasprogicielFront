<template>
    <AddEthnie />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import AddEthnie from "@/components/GestionPaie/Ethnie/AddEthnieModal.vue";

  
    export default defineComponent({
      name: "AddEthniePage",
      components: {
        AddEthnie,
      },
    });
  </script>