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

//store stuff
const store = useSearchStore()

// DATA
const word = ref('')

// METHODS
const handleSubmit = () => {
  const reg = new RegExp('^[a-zA-Z]+$')

  if (!reg.test(word.value)) {
    handleInvalid(word.value)
  } else {
    store.searchDictionary(word.value)
  }
  word.value = ''
}

const handleInvalid = (word) => {
  alert(`Please type letters only! "${word}" is not valid!`)
  //   THIS WILL EVENTUALLY NEED TO TRIGGER THE 'ERROR VIEW'
}
</script>