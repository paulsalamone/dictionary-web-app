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
          <h1 class="b-definitions__word">
            <b> {{ results.word }}</b>
          </h1>
          <h4 class="b-definitions__phonetic">{{ results.phonetic }}</h4>
        </div>
        <AudioPlayer v-if="audioLink !== ''" :phonetics="results.phonetics" />
      </div>

      <!-- MEANINGS -->
      <div v-for="(meaning, index) in results.meanings" :key="index">
        <!-- POS -->
        <div :class="`b-definitions__pos ${store.fontBold}`">
          <h2 class="b-definitions__pos-heading">
            {{ meaning.partOfSpeech }}
          </h2>
          <div class="b-definitions__pos-line"></div>
        </div>

        <!-- "MEANING" -->
        <h2 class="b-definitions__meaning">Meaning</h2>

        <!-- DEFINITIONS -->
        <div v-for="(definition, index) in meaning.definitions" :key="index">
          <ul>
            <li class="b-definitions__bullet">
              {{ definition.definition }}
            </li>
          </ul>

          <!-- SYNONYMS -->
          <p
            class="b-definitions__synonyms"
            v-if="definition.synonyms && definition.synonyms.length > 0"
          >
            Synonyms
            <span
              v-for="(synonym, index) in definition.synonyms"
              :key="index"
              :class="`b-definitions__synonyms-span ${store.fontBold}`"
              @click.prevent="handleLink(synonym)"
              >{{ synonym }}</span
            >
          </p>
          <!-- ANTONYMS -->
          <p
            class="b-definitions__synonyms"
            v-if="definition.antonyms && definition.antonyms.length > 0"
          >
            Antonyms
            <span
              v-for="(antonym, index) in definition.antonyms"
              :key="index"
              class="b-definitions__synonyms-span"
              @click.prevent="handleLink(antonym)"
              >{{ antonym }}</span
            >
          </p>
          <!-- EXAMPLES -->
          <p
            class="b-definitions__examples"
            v-if="definition.example && definition.example.length > 0"
          >
            "{{ definition.example }}"
          </p>
        </div>
      </div>
      <!-- <hr /> -->
      <p class="b-definitions__source">
        Source:
        <a :href="results.sourceUrls" class="b-definitions__source-url" target="blank">{{
          results.sourceUrls[0]
        }}</a
        ><img src="../assets/images/icon-new-window.svg" alt="" />
      </p>
    </div>
    <!-- NO DEFINITIONS -->

    <div v-if="!hasResults && !store.empty && !store.invalid" class="b-definitions__none">
      <img src="../assets/images/" alt="" />
      <h1 class="b-definitions__none-emoji">🙁</h1>
      <h3 :class="`${store.fontBold}`">No Definitions Found</h3>
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


