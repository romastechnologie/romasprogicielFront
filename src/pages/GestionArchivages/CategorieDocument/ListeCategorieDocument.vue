<template>
    <ListeCategorieDocument/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
  
import ListeCategorieDocument from "@/components/GestionArchivages/CategorieDocument/ListeCategorieDocument.vue";

    export default defineComponent({
      name: "ListeCategorieDocumentPage",
      components: {
        
        ListeCategorieDocument,
      },
    });
  </script>


