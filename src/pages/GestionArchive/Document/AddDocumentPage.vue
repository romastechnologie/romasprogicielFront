<template>
    <AddDocument />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddDocument from "@/components/GestionArchive/Document/AddDocument.vue";
  
    export default defineComponent({
      name: "AddDocumentPage",
      components: {
        
        AddDocument,
      },
    });
  </script>