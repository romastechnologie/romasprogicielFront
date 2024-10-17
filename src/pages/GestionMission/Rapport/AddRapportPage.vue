<template>
    <AddRapport/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import AddRapport from "@/components/GestionMission/Rapport/AddRapportModal.vue";

  
    export default defineComponent({
      name: "AddRapportPage",
      components: {
        AddRapport,
      },
    });
  </script>