<template>
    <EditMission />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditMission from "@/components/GestionMission/Mission/EditMission.vue";
  
    export default defineComponent({
      name: "EditMissionPage",
      components: {
        
        EditMission,
      },
    });
  </script>