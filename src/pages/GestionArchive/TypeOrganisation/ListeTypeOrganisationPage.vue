<template>
    <ListeTypeOrganisation />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeTypeOrganisation from "@/components/GestionArchive/TypeOrganisation/ListeTypeOrganisation.vue";

  
    export default defineComponent({
      name: "ListeTypeOrganisationPage",
      components: {
        ListeTypeOrganisation,
      },
    });
  </script>