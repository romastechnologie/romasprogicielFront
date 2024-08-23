<template>
    <ListeEthnie />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeEthnie from "@/components/GestionPaie/Ethnie/ListeEthnie.vue";

  
    export default defineComponent({
      name: "ListeEthniePage",
      components: {
        ListeEthnie,
      },
    });
  </script>