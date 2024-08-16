<template>
    <AddMedia />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddMedia from "@/components/GesCom/Media/AddMedia.vue";
  
    export default defineComponent({
      name: "AddMediaPage",
      components: {
        
        AddMedia,
      },
    });
  </script>