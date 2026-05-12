<template>
    <ListeTypeMoyenRoulant/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    

import ListeTypeMoyenRoulant from "@/components/GestionPack/TypeMoyenRoulant/ListeTypeMoyenRoulant.vue";

    export default defineComponent({
      name: "ListeTypeMoyenRoulantPage",
      components: {
        
        ListeTypeMoyenRoulant,
      },
    });
  </script>


