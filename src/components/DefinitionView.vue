<template>
  <div id="definition-view" v-if="store.searchString">
    <h1>{{ results.word }}</h1>
    <h4 class="purple">{{ results.phonetic }}</h4>

<!-- AUDIO UNIT -->
    <p v-for="(phonetics, index) in Object.values(results.phonetics)" :key="index">
    <div v-if="phonetics.audio">
      <audio controls :key="phonetics.audio">
        <source :src="phonetics.audio ?? phonetics.audio" type="audio/mp3" >
      </audio>
    </div>
    </p>

<!-- MEANINGS -->
    <p v-for="(meaning, index) in results.meanings" :key="index">•• {{ meaning }}</p>

    <p>{{ results.meanings }}</p>
    <p>{{ results.license }}</p>
    <p>{{ results.sourceUrls }}</p>

    <p>source</p>
  </div>
</template>

<script setup >
import { ref, watch, computed } from 'vue'
import { useSearchStore } from '../stores/SearchStore'
const store = useSearchStore()

let results = ref('')
let audioLink = ref('')
const loaded = computed(() => {
  return Object(store.searchResponse[0])
})

watch(loaded, (newVal, oldVal) => {
  results.value = newVal
  console.log(results.value)
})

watch(results, (val) => {
  val ? (audioLink.value = results.value.phonetics.audio) : null
})
</script>


