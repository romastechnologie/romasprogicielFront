<template>
    <EditMedia />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditMedia from "@/components/GesCom/Media/EditMedia.vue";
  
    export default defineComponent({
      name: "EditMediaPage",
      components: {
        
        EditMedia,
      },
    });
  </script>