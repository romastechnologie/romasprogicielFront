<template>
    <ListeDepartement/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeDepartement from "../../components/Departement/ListeDepartement.vue";

    export default defineComponent({
      name: "ListeDepartementPage",
      components: {
        ListeDepartement,
      },
    });
  </script>