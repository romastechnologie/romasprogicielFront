<template>
    <ListePermissionP/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListePermissionP from "@/components/GestionPersonnel/PermissionP/ListePermissionP.vue";

    export default defineComponent({
      name: "ListePermissionPPage",
      components: {
        ListePermissionP,
      },
    });
  </script>