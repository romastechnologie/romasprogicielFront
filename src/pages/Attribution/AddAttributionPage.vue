<template>
    <AddAttributionModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddAttributionModal from "@/components/Attribution/AddAttributionModal.vue";
  
    export default defineComponent({
      name: "AddAttributionPage",
      components: {
        AddAttributionModal,
      },
    });
  </script>