<template>
    <EditMouvementBien />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditMouvementBien from "@/components/GestionImmobilisation/MouvementBien/EditMouvementBien.vue";
  
    export default defineComponent({
      name: "EditMouvementBienPage",
      components: {
        EditMouvementBien,
      },
    });
  </script>