<template>
  <EditUser :isProfile="isProfile" />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import EditUser from "../../components/Users/EditUser.vue";

export default defineComponent({
  name: "EditUserPage",
  components: {
    EditUser,
  },
  setup() {
    const route = useRoute();
    const isProfile = computed(() => route.name === "UserProfile");

    return { isProfile };
  },
});
</script>
