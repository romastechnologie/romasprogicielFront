<template>
    <AddPermissionP />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddPermissionP from "@/components/GestionPersonnel/PermissionP/AddPermissionP.vue";
  
    export default defineComponent({
      name: "AddPermissionPPage",
      components: {
        AddPermissionP,
      },
    });
  </script>