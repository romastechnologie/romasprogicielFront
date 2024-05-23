<template>
    <ListeService />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeService from "../../components/Service/ListeService.vue";

  
    export default defineComponent({
      name: "ListeServicePage",
      components: {
        ListeService,
      },
    });
  </script>