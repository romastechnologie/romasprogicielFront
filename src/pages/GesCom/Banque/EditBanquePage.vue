<template>
    <EditBanque />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditBanque from "@/components/GesCom/Banque/EditBanque.vue";
  
    export default defineComponent({
      name: "EditBanquePage",
      components: {
        
        EditBanque,
      },
    });
  </script>