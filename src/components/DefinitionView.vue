<template>
<div>
<!-- NO DEFINITIONS -->
  <div v-if="!hasResults && !store.empty && !store.invalid" id="no-definitions-view">
    <img src="../assets/images/" alt="" />
    <h1>🙁</h1>
    <h2>No Definitions Found</h2>
    <p>
      Sorry pal, we couldn't find definitions for the word you were looking for. You can try the
      search again at later time or head to the web instead.
    </p>
  </div>

    <!-- DEFINITION VIEW -->
  <div v-if="hasResults && store.searchString && !store.empty && !store.invalid" id="definition-view" >
    <div class="header">
      <div class="word-top">
    <h1>{{ results.word }}</h1>
    <h4 class="purple heading-m">{{ results.phonetic }}</h4>
    </div>
    <AudioPlayer v-if="audioLink !== ''" :phonetics="results.phonetics" />
    </div>
    <div v-for="(meaning, index) in results.meanings" :key="index">
      <h2 class="heading-s">{{ meaning.partOfSpeech }}</h2>
      <p v-for="(definition, index) in meaning.definitions" :key="index">
        <h2 class="meaning">Meaning</h2>
        <h3>• {{definition.definition}}</h3>
        <p v-if="definition.synonyms">SYNONYMS:{{definition.synonyms}}</p>
                  <p v-if="definition.antonyms.length">ANTONYMS: {{definition.antonyms}}</p>
                          <p v-if="definition.example">EXAMPLE: {{definition.example}}</p>


      </p>
    </div>
    <a :href="results.sourceUrls">{{ results.sourceUrls }}</a>
  </div>
  </div>
</template>

<script setup >
import { ref, watch, computed } from 'vue'
import { useSearchStore } from '../stores/SearchStore'
import AudioPlayer from './AudioPlayer.vue'

const store = useSearchStore()

let results = ref('')
let audioLink = ref('')
let hasResults = ref(true)
const loaded = computed(() => {
  return Object(store.searchResponse[0])
})

watch(loaded, (newVal, oldVal) => {
  results.value = newVal
  //   console.log(results.value)

  hasResults.value = Object.keys(newVal).length > 0
})

// const hasResults = computed(() => {

// })
watch(results, (val) => {
  console.log('results watcher:', Object.keys(val).length)
  if (Object.keys(val).length > 0) {
    val ? (audioLink.value = results.value.phonetics.audio) : null
  }
})
</script>


