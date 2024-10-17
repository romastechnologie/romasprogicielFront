<template>
    <AddNoteMission/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import AddNoteMission from "@/components/GestionMissions/NoteMission/AddNoteMission.vue";
  
    export default defineComponent({
      name: "AddNoteMissionPage",
      components: {
        
        AddNoteMission,
      },
    });
  </script>