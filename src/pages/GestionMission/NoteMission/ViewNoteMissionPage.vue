<template>
    <ViewNoteMission  />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ViewNoteMission from "@/components/GestionMissions/NoteMission/ViewNoteMission.vue";
  
    export default defineComponent({
      name: "ViewNoteMissionPage",
      components: {
        
        ViewNoteMission,
      },
    });
  </script>