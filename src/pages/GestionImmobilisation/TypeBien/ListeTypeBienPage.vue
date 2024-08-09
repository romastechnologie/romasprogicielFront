<template> 
    <ListeTypeBien/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import ListeTypeBien from "@/components/GestionImmobilisation/TypeBien/ListeTypeBien.vue";

    export default defineComponent({
      name: "ListeTypeBienPage",
      components: {
       
        ListeTypeBien,
      },
    });
  </script>