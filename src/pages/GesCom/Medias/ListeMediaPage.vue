<template>
    <ListeMedia/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeMedia from "@/components/GesCom/Media/ListeMedia.vue";

    export default defineComponent({
      name: "ListeMediaPage",
      components: {
        
        ListeMedia,
      },
    });
  </script>