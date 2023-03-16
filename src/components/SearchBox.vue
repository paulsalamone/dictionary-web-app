<template>
  <section class="b-search">
    <form
      action=""
      class="b-search__form"
      id="search-form"
      @submit.prevent="handleSubmit()"
      :class="store.empty || store.invalid ? 'b-search__form-empty' : null"
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
        class="b-search__input"
        type="search"
        placeholder="enter word"
        v-model="word"
        id="search-input"
        name="search-input"
        @focus="handleFocusBlur('search-form', 'focus')"
        @blur="handleFocusBlur('search-form', 'blur')"
      />
      <button
        class="b-search__button"
        type="submit"
        id="submit-button"
        @focus="handleFocusBlur('submit-button', 'focus')"
        @blur="handleFocusBlur('submit-button', 'blur')"
      >
        <img src="../assets/images/icon-search.svg" alt="search icon" />
      </button>
    </form>
    <p v-if="store.empty" class="b-form_response-empty">Whoops, can't be empty...</p>
    <p v-if="store.invalid" class="b-form_response-invalid">
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
    store.searchDictionary(word.value)
  } else {
    word.value = ''
    handleInvalid()
  }
  word.value = ''
  handleFocusBlur('search-form', 'blur')
  handleFocusBlur('submit-button', 'blur')
}

const handleEmpty = () => {
  store.handleEmpty()
}
const handleInvalid = () => {
  store.handleInvalid()
}

const handleFocusBlur = (id, type) => {
  const el = document.getElementById(id)

  if (type === 'focus') {
    el.classList.add('b-search__form-focus')
    isFocus.value = true
  } else {
    el.classList.remove('b-search__form-focus')
    isFocus.value = false
  }
}
</script>