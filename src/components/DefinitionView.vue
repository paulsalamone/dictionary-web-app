<template>
  <div id="definition-view" v-if="store.searchString">
    <h1>{{ results.word }}</h1>
    <h4 class="purple">{{ results.phonetic }}</h4>

    <!-- AUDIO UNIT -->
    <AudioPlayer :phonetics="results.phonetics" />


    <!-- MEANINGS -->

    <div v-for="(meaning, index) in results.meanings" :key="index">
      <h2>{{ meaning.partOfSpeech }}</h2>
      <p v-for="(definition, index) in meaning.definitions" :key="index">

        <h3>DEFINITION: {{definition.definition}}</h3>
        <p v-if="definition.synonyms">SYNONYMS:{{definition.synonyms}}</p>
                  <p v-if="definition.antonyms.length">ANTONYMS: {{definition.antonyms}}</p>
                          <p v-if="definition.example">EXAMPLE: {{definition.example}}</p>


      </p>
    </div>
    <a :href="results.sourceUrls">{{ results.sourceUrls }}</a>
  </div>
</template>

<script setup >
import { ref, watch, computed } from 'vue'
import { useSearchStore } from '../stores/SearchStore'
import AudioPlayer from './AudioPlayer.vue'

const store = useSearchStore()

let results = ref('')
let audioLink = ref('')
const loaded = computed(() => {
  return Object(store.searchResponse[0])
})

watch(loaded, (newVal, oldVal) => {
  results.value = newVal
  //   console.log(results.value)
})

watch(results, (val) => {
  val ? (audioLink.value = results.value.phonetics.audio) : null
})
</script>


