<template>
  <div>
    <!-- DEFINITION VIEW -->
    <div
      class="b-definitions"
      v-if="hasResults && store.searchString && !store.empty && !store.invalid"
      id="definition-view"
    >
      <!-- HEADER -->
      <div class="b-definitions__header">
        <div class="b-definitions__top">
          <h1 class="size-64 bold darkgrey3">{{ results.word }}</h1>
          <h4 class="size-24 purple">{{ results.phonetic }}</h4>
        </div>
        <AudioPlayer v-if="audioLink !== ''" :phonetics="results.phonetics" />
      </div>

      <!-- MEANINGS -->
      <div v-for="(meaning, index) in results.meanings" :key="index">
        <!-- POS -->
        <div class="b-definitions__pos">
          <h2 class="italic size-24 darkgrey3 b-definitions__pos-heading">
            {{ meaning.partOfSpeech }}
          </h2>
          <div class="b-definitions__pos-line"></div>
        </div>

        <!-- "MEANING" -->
        <h2 class="mediumgrey size-20 mt-2">Meaning</h2>

        <!-- DEFINITIONS -->
        <div v-for="(definition, index) in meaning.definitions" :key="index">
          <ul>
            <li class="b-definitions__bullet darkgrey2 size-18">
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
              class="b-definitions__synonyms"
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
      <div class="b-definitions__source">
        <a :href="results.sourceUrls" class="size-16 mediumgrey mt-2">{{
          results.sourceUrls[0]
        }}</a>
      </div>
    </div>
    <!-- NO DEFINITIONS -->
    <div v-if="!hasResults && !store.empty && !store.invalid" class="b-definitions__none">
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

const loaded = computed(() => {
  return Object(store.searchResponse[0])
})

watch(loaded, (newVal) => {
  results.value = newVal

  hasResults.value = Object.keys(newVal).length > 0
})

watch(results, (val) => {
  if (Object.keys(val).length > 0) {
    val ? (audioLink.value = results.value.phonetics.audio) : null
  }
})

const handleLink = (word) => {
  store.searchDictionary(word)
}
</script>


