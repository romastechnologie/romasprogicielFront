<template>
    <ListePointtresorerie />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
   import ListePointtresorerie from "@/components/GestionTresorerie/Pointtresorerie/ListePointtresorerie.vue";
  
    export default defineComponent({
      name: "ListePointtresoreriePage",
      components: {
        ListePointtresorerie,
      },
    });
  
  </script>