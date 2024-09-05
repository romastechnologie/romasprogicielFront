<template>
    <ListeTypeDocument/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
  
import ListeTypeDocument from "@/components/GestionArchivages/TypeDocument/ListeTypeDocument.vue";

    export default defineComponent({
      name: "ListeTypeDocumentPage",
      components: {
        
        ListeTypeDocument,
      },
    });
  </script>


