<template>
    <ListeCourse/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import ListeCourse from "@/components/GestionPack/Course/ListeCourse.vue";

    export default defineComponent({
      name: "ListeCoursePage",
      components: {
        ListeCourse,
      },
    });
  </script>