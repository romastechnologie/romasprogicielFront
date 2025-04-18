import { defineStore } from 'pinia';
import { ref } from 'vue';
import { data } from "@/core/data/task";
export const useTaskStore = defineStore('task', () => {
    let task = ref(data);
    return {
        task,
    };
});
//# sourceMappingURL=task.js.map