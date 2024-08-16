<template>
    <ViewPersonnel/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ViewPersonnel from "@/components/GesCom/Personnel/ViewPersonnel.vue";

    export default defineComponent({
      name: "ViewPersonnelPage",
      components: {
        
        ViewPersonnel,
      },
    });
  </script>