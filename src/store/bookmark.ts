
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { data } from "@/core/data/bookmark"

export const useBookmarkStore = defineStore('bookmark', () => {


    const favourite = ref<string[]>([])
    const activeclass = ref<string>('pills_created')

    function add(item: any) {
        data.push(item)
    }
    return {

        activeclass,
        favourite,

        add
    }
})
