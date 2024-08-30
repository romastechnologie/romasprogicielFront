<template>
    <AddCourse />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddCourse from "@/components/GestionPack/Course/AddCourse.vue";
  
    export default defineComponent({
      name: "AddCoursePage",
      components: {
        AddCourse,
      },
    });
  </script>