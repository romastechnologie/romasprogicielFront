<template>
    <FilterDocument />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import FilterDocument from "@/components/GestionArchive/Document/FilterDocument.vue";
  
    export default defineComponent({
      name: "FilterDocumentPage",
      components: {
        
        FilterDocument,
      },
    });
  </script>