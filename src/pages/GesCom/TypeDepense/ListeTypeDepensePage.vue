<template>
    <ListeTypeDepense/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeTypeDepense from "@/components/GesCom/TypeDepense/ListeTypeDepense.vue";

    export default defineComponent({
      name: "ListeTypeDepensePage",
      components: {
        
        ListeTypeDepense,
      },
    });
  </script>