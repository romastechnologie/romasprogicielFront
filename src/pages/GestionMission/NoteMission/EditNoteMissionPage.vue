<template>
    <EditNoteMission  />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import EditNoteMission from "@/components/GestionMissions/NoteMission/EditNoteMission.vue";
  
    export default defineComponent({
      name: "EditNoteMissionPage",
      components: {
        
        EditNoteMission,
      },
    });
  </script>