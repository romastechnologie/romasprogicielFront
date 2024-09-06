<template>
    <ListeOrganisation />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeOrganisation from "@/components/GestionArchive/Organisation/ListeOrganisation.vue";

  
    export default defineComponent({
      name: "ListeOrganisationPage",
      components: {
        ListeOrganisation,
      },
    });
  </script>