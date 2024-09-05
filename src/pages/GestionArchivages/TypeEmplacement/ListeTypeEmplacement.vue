<template>
    <ListeTypeEmplacement/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
  
import ListeTypeEmplacement from "@/components/GestionArchivages/TypeEmplacement/ListeTypeEmplacement.vue";

    export default defineComponent({
      name: "ListeTypeEmplacementPage",
      components: {
        
        ListeTypeEmplacement,
      },
    });
  </script>


