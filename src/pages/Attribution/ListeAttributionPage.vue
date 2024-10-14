<template>
    <ListeAttribution />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeAttribution from "@/components/Attribution/ListeAttribution.vue";

  
    export default defineComponent({
      name: "ListeAttributionPage",
      components: {
        ListeAttribution,
      },
    });
  </script>