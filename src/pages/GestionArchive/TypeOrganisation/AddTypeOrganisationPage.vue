<template>
    <AddTypeOrganisationModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    
    import  AddTypeOrganisationModal from "@/components/GestionArchive/TypeOrganisation/AddTypeOrganisationModal.vue";

  
    export default defineComponent({
      name: "AddTypeOrganisationPage",
      components: {
        AddTypeOrganisationModal,
      },
    });
  </script>