<template>
    <ListeMission/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
 import ListeMission from "@/components/GestionMission/Mission/ListeMission.vue";

    export default defineComponent({
      name: "ListeMissionPage",
      components: {
        
        ListeMission,
      },
    });
  </script>