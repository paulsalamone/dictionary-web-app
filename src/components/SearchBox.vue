<template>
  <section id="search-box">
    <form
      action=""
      @submit.prevent="handleSubmit()"
      :class="store.empty || store.invalid ? 'empty-search' : null"
    >
      <input type="search" placeholder="enter word" v-model="word" />
      <button type="submit">
        <img src="../assets/images/icon-search.svg" alt="search icon" />
      </button>
    </form>
    <p v-if="store.empty" class="red">Whoops, can't be empty...</p>
    <p v-if="store.invalid" class="red">
      Please use letters only, no numbers or special characters...
    </p>
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

  if (word.value === '') {
    handleEmpty()
    return
  }
  if (reg.test(word.value)) {
    store.searchDictionary(word.value)
  } else {
    handleInvalid()
  }
  word.value = ''
}

const handleEmpty = () => {
  console.log('EMPTY')
  store.handleEmpty()
}
const handleInvalid = () => {
  store.handleInvalid()
}
</script>