<template>
    <AddMouvementBien />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddMouvementBien from "@/components/GestionImmobilisation/MouvementBien/AddMouvementBien.vue";
  
    export default defineComponent({
      name: "AddMouvementPage",
      components: {

        AddMouvementBien,
      },
    });
  </script>