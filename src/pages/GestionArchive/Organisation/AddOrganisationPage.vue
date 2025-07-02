<template>
    <AddOrganisationModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    
    import  AddOrganisationModal from "@/components/GestionArchive/Organisation/AddOrganisationModal.vue";

  
    export default defineComponent({
      name: "AddOrganisationPage",
      components: {
        AddOrganisationModal,
      },
    });
  </script>