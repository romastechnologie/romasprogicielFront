<template>
    <AddBanque />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddBanque from "@/components/GesCom/Banque/AddBanque.vue";
  
    export default defineComponent({
      name: "AddBanquePage",
      components: {
        
        AddBanque,
      },
    });
  </script>