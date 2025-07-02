<template>
    <AddArchivage />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddArchivage from "@/components/GestionPersonnel/Demandes/AddArchivage.vue";
  
    export default defineComponent({
      name: "AddArchivagePage",
      components: {
        AddArchivage,
      },
    });
  </script>