<template>
    <div class="container-fluid">
        <div class="row project-cards">
            <UserTab />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'

const UserTab = defineAsyncComponent(() => import("@/components/theme/users/userlist/UserTab.vue"))
</script>