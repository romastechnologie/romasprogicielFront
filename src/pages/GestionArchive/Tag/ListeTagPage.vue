<template>
    <ListeTag />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeTag from "@/components/GestionArchive/Tag/ListeTag.vue";

  
    export default defineComponent({
      name: "ListeTagPage",
      components: {
        ListeTag,
      },
    });
  </script>