<template>
    <ListeDocument/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeDocument from "@/components/GestionArchive/Document/ListeDocument.vue";

    export default defineComponent({
      name: "ListeDocumentPage",
      components: {
        
        ListeDocument,
      },
    });
  </script>