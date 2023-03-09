<template>
  <section id="search-box">
    <form action="" @submit.prevent="handleSubmit()">
      <input type="search" placeholder="enter word" v-model="word" />
      <button type="submit">
        <img src="../assets/images/icon-search.svg" alt="search icon" />
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
  word.value = ''
}

const handleInvalid = () => {
  alert(`
  LETTERS ONLY! 
  
  (this should trigger Error View)
  `)
}
</script>