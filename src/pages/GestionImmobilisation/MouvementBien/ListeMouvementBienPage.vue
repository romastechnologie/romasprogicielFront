<template>
    <ListeMouvementBien/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import ListeMouvementBien from "@/components/GestionImmobilisation/MouvementBien/ListeMouvementBien.vue";

    export default defineComponent({
      name: "ListeMouvementBienPage",
      components: {
        ListeMouvementBien,
      },
    });
  </script>