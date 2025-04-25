<template>
    <ListeTypeDoc/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
  
import ListeTypeDoc from "@/components/GestionArchivages/TypeDoc/ListeTypeDoc.vue";

    export default defineComponent({
      name: "ListeTypeDocPage",
      components: {
        
        ListeTypeDoc,
      },
    });
  </script>


