<template>
  <div id="definition-view" v-show="store.searchString">
    <!-- <h1>{{ store.searchString }}</h1> -->
    <!-- pronunciation -->

    <!-- <p id="phonemes">
      {{ loaded ? store.searchResponse[0].phonetic : null }}
    </p> -->
    <!-- words -->
    <!-- <p>{{ loaded ? meanings : null }}</p> -->
    <!-- source link -->
    <p>source</p>
  </div>
</template>

<script setup >
import { ref, onMounted, watch, computed } from 'vue'
import { useSearchStore } from '../stores/SearchStore'
const store = useSearchStore()

// const meanings = ref(null)

const loaded = computed(() => {
  console.log('loading...', Object(store.searchResponse[0]))
  return Object(store.searchResponse[0])
})

console.log('loaded?', loaded)

watch(loaded, (newVal, oldVal) => {
  console.log('loaded: ', newVal, oldVal)
})

// const meanings = computed(() => {
//   return store.searchResponse[0].meanings
// })
</script>

<style>
</style>