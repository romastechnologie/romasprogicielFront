<template>
    <AddAmmortissement />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddAmmortissement from "@/components/GestionImmobilisation/Amortissement/AddAmmortissement.vue";
  
    export default defineComponent({
      name: "AddAmortissementPage",
      components: {
        AddAmmortissement,
      },
    });
  </script>