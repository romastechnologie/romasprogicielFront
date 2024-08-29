<template>
    <ListeTypeEntretien/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeTypeEntretien from "@/components/GestionPack/TypeEntretien/ListeTypeEntretien.vue";

    export default defineComponent({
      name: "ListeTypeEntretienPage",
      components: {
        
        ListeTypeEntretien,
      },
    });
  </script>