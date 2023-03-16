<template>
  <div>
    <!-- DEFINITION VIEW -->
    <div
      v-if="hasResults && store.searchString && !store.empty && !store.invalid"
      id="definition-view"
    >
      <!-- HEADER -->
      <div class="header">
        <div class="word-top">
          <h1 class="size-64 bold darkgrey3">{{ results.word }}</h1>
          <h4 class="size-24 purple">{{ results.phonetic }}</h4>
        </div>
        <AudioPlayer v-if="audioLink !== ''" :phonetics="results.phonetics" />
      </div>

      <!-- MEANINGS -->
      <div v-for="(meaning, index) in results.meanings" :key="index">
        <!-- POS -->
        <div class="pos-block">
          <h2 class="italic size-24 darkgrey3 heading-pos">{{ meaning.partOfSpeech }}</h2>
          <div class="pos-line"></div>
        </div>

        <!-- "MEANING" -->
        <h2 class="mediumgrey size-20 mt-2">Meaning</h2>

        <!-- DEFINITIONS -->
        <div v-for="(definition, index) in meaning.definitions" :key="index">
          <ul>
            <li class="definition-bullet darkgrey2 size-18">
              {{ definition.definition }}
            </li>
          </ul>

          <!-- EXTRAS -->

          <!-- SYNONYMS -->
          <p
            class="mediumgrey size-20 mt-2"
            v-if="definition.synonyms && definition.synonyms.length > 0"
          >
            Synonyms
            <span
              v-for="(synonym, index) in definition.synonyms"
              :key="index"
              class="synonyms"
              @click.prevent="handleLink(synonym)"
              >{{ synonym }}</span
            >
          </p>
          <!-- ANTONYMS -->
          <p
            class="mediumgrey size-20 mt-2"
            v-if="definition.antonyms && definition.antonyms.length > 0"
          >
            Synonyms
            <span
              v-for="(antonym, index) in definition.antonyms"
              :key="index"
              class="synonyms"
              @click.prevent="handleLink(antonym)"
              >{{ antonym }}</span
            >
          </p>
          <!-- EXAMPLES -->
          <p
            class="mediumgrey size-18 mt-1 ml-2a mb-2"
            v-if="definition.example && definition.example.length > 0"
          >
            "{{ definition.example }}"
          </p>
        </div>
      </div>
      <!-- <hr /> -->
      <div class="source">
        <a :href="results.sourceUrls" class="size-16 mediumgrey mt-2">{{
          results.sourceUrls[0]
        }}</a>
      </div>
    </div>
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
  </div>
</template>

<script setup >
import { ref, watch, computed } from 'vue'
import { useSearchStore } from '../stores/SearchStore'
import AudioPlayer from './AudioPlayer.vue'

const store = useSearchStore()

const results = ref('')
const audioLink = ref('')
const hasResults = ref(true)
const synonyms = ref(null)
const antonyms = ref(null)
const example = ref(null)

const loaded = computed(() => {
  return Object(store.searchResponse[0])
})

watch(loaded, (newVal, oldVal) => {
  console.log('watch loaded')

  results.value = newVal

  hasResults.value = Object.keys(newVal).length > 0
})

watch(results, (val) => {
  console.log('watch results val:', val)
  console.log('watch length:', Object.keys(val).length > 0)
  // console.log('results watcher:', val)
  if (Object.keys(val).length > 0) {
    val ? (audioLink.value = results.value.phonetics.audio) : null
  }
})

const handleFiguratives = (arr) => {
  let output = ''
  for (let i = 0; i < arr.length; i++) {
    output += `<a class="synonyms" @click.prevent="handleLink('${arr[i]}')">${arr[i]}</a>`
  }
  return output
}

const handleLink = (word) => {
  console.log('!!!!!!!', word)

  store.searchDictionary(word)
}
</script>


