<template>
  <section id="search-box">
    <form action="" @submit.prevent="handleSubmit()">
      <input type="text" placeholder="enter word" v-model="word" />
      <button type="submit">
        <img src="../assets/images/icon-search.svg" alt="search icon" />search
      </button>
    </form>
  </section>
</template>

<script setup >
import { ref } from 'vue'
import { useSearchStore } from '../stores/SearchStore'
const store = useSearchStore()

// DATA
const word = ref('')

// METHODS
const handleSubmit = () => {
  const reg = new RegExp('^[a-zA-Z]+$')

  if (reg.test(word.value)) {
    store.searchDictionary(word.value)
  } else {
    handleInvalid()
  }

  //   reg.test(word.value) ? searchDictionaryLocal(word.value) : handleInvalid()

  word.value = ''
}

const handleInvalid = () => {
  alert(`
  LETTERS ONLY! 
  
  (this should trigger Error View)
  `)
}

// const searchDictionaryLocal = async (word) => {
//   // let searchResponse;

//   await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
//     .then((response) => response.json())
//     .then((data) => {
//       //   searchResponse = data
//       console.log(data)
//       this.$emit('api-response', word)
//     })
//     .catch((error) => {
//       console.log('ERROR! ', error)
//     })
// }
</script>