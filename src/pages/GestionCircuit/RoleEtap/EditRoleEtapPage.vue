<template>
    <EditRoleEtap />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditRoleEtap from "@/components/GestionCircuit/RoleEtap/EditRoleEtap.vue";
  
    export default defineComponent({
      name: "EditRoleEtapPage",
      components: {
        
        EditRoleEtap,
      },
    });
  </script>