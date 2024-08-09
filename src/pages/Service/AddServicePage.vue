<template>
    <AddServiceModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddServiceModal from "../../components/Service/AddServiceModal.vue";
  
    export default defineComponent({
      name: "AddServicePage",
      components: {
        AddServiceModal,
      },
    });
  </script>