<template>
    <ViewMission/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ViewMission from "@/components/GestionMission/Mission/ViewMission.vue";

    export default defineComponent({
      name: "ViewMissionPage",
      components: {
        
        ViewMission,
      },
    });
  </script>