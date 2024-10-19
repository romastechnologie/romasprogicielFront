<template>
    <ListeRoleEtap/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
 import ListeRoleEtap from "@/components/GestionCircuit/RoleEtap/ListeRoleEtap.vue";

    export default defineComponent({
      name: "ListeRoleEtapPage",
      components: {
        
        ListeRoleEtap,
      },
    });
  </script>