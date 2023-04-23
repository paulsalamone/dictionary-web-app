<template>
  <div class="b-style-selectors">
    <FontSelector />
    <div class="b-colors">
      <div
        :class="`b-colors__toggler b-colors__toggler-${currentTheme}`"
        @click="toggleTheme()"
        style="cursor: pointer"
      >
        <div :class="`b-colors__knob b-colors__knob-${currentTheme}`"></div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
        <path
          fill="none"
          :stroke="strokeColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import FontSelector from './FontSelector.vue'
import { ref, computed, onMounted } from 'vue'
import { useSearchStore } from '../stores/SearchStore'

const store = useSearchStore()

// THEME STUFF
const currentTheme = ref(null)

const strokeColor = computed(() => {
  return currentTheme.value === 'light' ? '#838383' : '#A445ed'
})

onMounted(() => {
  currentTheme.value = localStorage.getItem('theme')
  console.log('mounted currentTheme: ', currentTheme.value)
})

const toggleTheme = () => {
  currentTheme.value === 'light' ? (currentTheme.value = 'dark') : (currentTheme.value = 'light')

  store.setTheme(currentTheme.value)
}
</script>

<style>
</style>