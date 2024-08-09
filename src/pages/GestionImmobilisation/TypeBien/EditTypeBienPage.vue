<template>
    <EditTypeBien />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import EditTypeBien from "@/components/GestionImmobilisation/TypeBien/EditTypeBien.vue";
  
    export default defineComponent({
      name: "EditTypeBienPage",
      components: {
        EditTypeBien,
      },
    });
  </script>