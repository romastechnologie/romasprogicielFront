<template>
    <ListeUserEtapes/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ListeUserEtapes from "@/components/GestionCircuit/UserEtapes/ListeUserEtapes.vue";

    export default defineComponent({
      name: "ListeUserEtapesPage",
      components: {
        
        ListeUserEtapes,
      },
    });
  </script>