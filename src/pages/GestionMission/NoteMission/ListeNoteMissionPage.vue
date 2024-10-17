<template>
    <ListeNoteMission/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ListeNoteMission from "@/components/GestionMissions/NoteMission/ListeNoteMission.vue";

    export default defineComponent({
      name: "ListeNoteMissionPage",
      components: {
        
        ListeNoteMission,
      },
    });
  </script>