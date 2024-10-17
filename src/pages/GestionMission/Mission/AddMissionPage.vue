<template>
    <AddMission />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddMission from "@/components/GestionMission/Mission/AddMission.vue";
  
    export default defineComponent({
      name: "AddMissionPage",
      components: {
        
        AddMission,
      },
    });
  </script>