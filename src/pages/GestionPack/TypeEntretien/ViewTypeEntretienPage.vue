<template>
    <ViewTypeEntretien/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ViewTypeEntretien from "@/components/GestionPack/TypeEntretien/ViewTypeEntretien.vue";

    export default defineComponent({
      name: "ViewTypeEntretienPage",
      components: {
        
        ViewTypeEntretien,
      },
    });
  </script>