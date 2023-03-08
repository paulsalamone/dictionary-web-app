<template>
  <div id="definition-view" v-if="store.searchString">
    <!-- <h1>{{ store.searchString }}</h1> -->
    <!-- pronunciation -->
    <h1>{{ meaningsText.word }}</h1>
    <h4 class="purple">{{ meaningsText.phonetic }}</h4>
    <audio controls>
      <source src="https://api.dictionaryapi.dev/media/pronunciations/en/rat-uk.mp3" type="mp3" />
    </audio>
    <p>{{ audioLink }}</p>
    <p v-for="(phonetics, index) in Object.entries(meaningsText.phonetics)" :key="index">
      -- {{ index }}--{{ phonetics }}
    </p>

    <p v-for="(meaning, index) in meaningsText.meanings" :key="index">•• {{ meaning }}</p>

    <p>{{ meaningsText.meanings }}</p>
    <p>{{ meaningsText.license }}</p>
    <p>{{ meaningsText.sourceUrls }}</p>

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

let meaningsText = ref('')

const loaded = computed(() => {
  console.log('loading...', Object(store.searchResponse[0]))
  return Object(store.searchResponse[0])
})

const audioLink = computed(() => {
  // console.log('audio link:', meaningsText.value.phonetics[0].audio)
  return meaningsText.value.phonetics[0].audio ? meaningsText.value.phonetics[0].audio : null
})

console.log('loaded?', loaded)

watch(loaded, (newVal, oldVal) => {
  console.log('loaded: ', newVal, oldVal)
  console.log(Object.entries(newVal))
  meaningsText.value = newVal
})

// const meanings = computed(() => {
//   return store.searchResponse[0].meanings
// })
</script>

<style>
</style>