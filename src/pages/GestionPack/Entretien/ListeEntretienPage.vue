<template> 
    <ListeEntretien/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import ListeEntretien from "@/components/GestionPack/Entretien/ListeEntretien.vue";

    export default defineComponent({
      name: "ListeEntretienPage",
      components: {
       
        ListeEntretien,
      },
    });
  </script>