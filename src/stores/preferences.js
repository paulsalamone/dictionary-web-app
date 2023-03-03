import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePreferencesStore = defineStore('preferences', () => {

    const htmlEl = ref(document.getElementsByTagName('html')[0])

    const theme = ref("light")

    const font = ref("sanSerif")
    // const doubleCount = computed(() => count.value * 2)
    // function increment() {
    //     count.value++
    // }

    return { theme, font, htmlEl }
})
