<template> 
    <ListePanne/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import ListePanne from "@/components/GestionPack/Panne/ListePanne.vue";

    export default defineComponent({
      name: "ListePannePage",
      components: {
       
        ListePanne,
      },
    });
  </script>