<template>
    <ListeJustificatif/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeJustificatif from "@/components/GestionPersonnel/Justificatif/ListeJustificatif.vue";

    export default defineComponent({
      name: "ListeJustificatifPage",
      components: {
        ListeJustificatif,
      },
    });
  </script>