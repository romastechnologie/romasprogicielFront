<template>
    <ViewDocument/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ViewDocument from "@/components/GestionArchive/Document/ViewDocument.vue";

    export default defineComponent({
      name: "ViewDocumentPage",
      components: {
        
        ViewDocument,
      },
    });
  </script>