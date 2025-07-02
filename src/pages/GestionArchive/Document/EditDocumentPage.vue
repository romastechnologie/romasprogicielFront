<template>
    <EditDocument/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditDocument from "@/components/GestionArchive/Document/EditDocument.vue";
  
    export default defineComponent({
      name: "EditDocumentPage",
      components: {
        
        EditDocument,
      },
    });
  </script>