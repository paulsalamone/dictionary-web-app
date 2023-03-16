<template>
  <section id="search-box">
    <form
      action=""
      id="search-form"
      @submit.prevent="handleSubmit()"
      :class="store.empty || store.invalid ? 'empty-search' : null"
      :style="{
        'border-color': `${
          (isHover && store.empty) || store.invalid
            ? 'red'
            : isHover && !store.empty && !store.invalid
            ? '#A445ed'
            : isFocus && !store.empty && !store.invalid
            ? '#A445ed'
            : 'white'
        }`
      }"
      @mouseover="() => (isHover = true)"
      @mouseleave="() => (isHover = false)"
    >
      <input
        type="search"
        placeholder="enter word"
        v-model="word"
        id="search-input"
        name="search-input"
        @focus="handleFocus1()"
        @blur="handleBlur1()"
      />
      <button type="submit" id="submit-button" @focus="handleFocus2()" @blur="handleBlur2()">
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
const isHover = ref(false)
const isFocus = ref(false)
// METHODS
const handleSubmit = () => {
  const reg = new RegExp('^[a-zA-Z]+$')
  if (word.value === '') {
    handleEmpty()
    word.value = ''

    return
  }

  if (reg.test(word.value)) {
    console.log('SEARCH DICT')
    store.searchDictionary(word.value)
  } else {
    console.log('HANDLE INVAL')
    word.value = ''
    handleInvalid()
  }
  word.value = ''
  handleBlur1()
  handleBlur2()
}

const handleEmpty = () => {
  // console.log('EMPTY')
  store.handleEmpty()
}
const handleInvalid = () => {
  store.handleInvalid()
}

const handleFocus1 = () => {
  // console.log('input focus')
  const el = document.getElementById('search-form')
  el.classList.add('form-focus')
  isFocus.value = true
}
const handleBlur1 = () => {
  // console.log('input blur')
  const el = document.getElementById('search-form')
  el.classList.remove('form-focus')
  isFocus.value = false
}
const handleFocus2 = () => {
  // console.log('button focus')
  const el = document.getElementById('submit-button')
  el.classList.add('form-focus')
  isFocus.value = true
}
const handleBlur2 = () => {
  // console.log('button blur')
  const el = document.getElementById('submit-button')
  el.classList.remove('form-focus')
  isFocus.value = false
}
</script>