<template>
  <div class="b-font-selector">
    <div v-if="!expanded" class="b-font-selector__collapsed" @click="handleExpand">
      {{ currentFontName }}
      <img src="../assets/images/icon-arrow-down.svg" alt="arrow pointing down" />
    </div>
    <div v-else class="b-font-selector__expanded">
      <ul>
        <li class="san-serif" @click="handleSelect('san-serif')">Sans Serif</li>
        <li class="serif" @click="handleSelect('serif')">Serif</li>
        <li class="mono" @click="handleSelect('mono')">Mono</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useSearchStore } from '../stores/SearchStore'

const store = useSearchStore()

// EXPANSION STUFF
const expanded = ref(false)

const handleExpand = () => {
  expanded.value = true
}

// FONT STUFF
const currentFont = ref(null)

const currentFontName = computed(() => {
  return currentFont.value === 'san-serif'
    ? 'San Serif'
    : currentFont.value === 'serif'
    ? 'Serif'
    : 'Mono'
})
onMounted(() => {
  currentFont.value = localStorage.getItem('font')
})

watch(currentFont, (val) => {
  store.setFont(val)
})

const handleSelect = (font) => {
  console.log(font)
  expanded.value = false
  store.setFont(font)
  currentFont.value = font
}
</script>

<style>
</style>