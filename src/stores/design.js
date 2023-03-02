import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDesignStore = defineStore('design', () => {
    const colorMode = ref("light")
    const fontMode = ref("sanSerif")
    // const doubleCount = computed(() => count.value * 2)
    // function increment() {
    //     count.value++
    // }

    return { colorMode, fontMode }
})
