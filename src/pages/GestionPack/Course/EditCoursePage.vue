<template>
    <EditCourse />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EditCourse from "@/components/GestionPack/Course/EditCourse.vue";
  
    export default defineComponent({
      name: "EditCoursePage",
      components: {
        EditCourse,
      },
    });
  </script>