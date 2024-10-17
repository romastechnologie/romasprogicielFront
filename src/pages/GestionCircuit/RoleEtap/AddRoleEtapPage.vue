<template>
    <AddRoleEtap />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddRoleEtap from "@/components/GestionCircuit/RoleEtap/AddRoleEtap.vue";
  
    export default defineComponent({
      name: "AddRoleEtapPage",
      components: {
        
        AddRoleEtap,
      },
    });
  </script>