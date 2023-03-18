<template>
  <section class="b-search">
    <form
      action=""
      class="b-search__form"
      id="search-form"
      @submit.prevent="handleSubmit()"
      :class="store.empty || store.invalid ? 'b-search__form-empty' : null"
      :style="{
        'border-color': `${borderStyle}`,
        'box-shadow': `${shadowStyle}`
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
        autocomplete="off"
        @focus="handleFocusBlur('focus')"
        @blur="handleFocusBlur('blur')"
      />
      <button
        class="b-search__button"
        type="submit"
        id="submit-button"
        @focus="handleFocusBlur('focus')"
        @blur="handleFocusBlur('blur')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          alt="search icon"
        >
          <path
            fill="none"
            :stroke="store.invalid || store.empty ? '#dd5252' : '#A445ed'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
          />
        </svg>
      </button>
    </form>
    <p v-if="store.empty" class="b-form_response-empty">Whoops, can't be empty...</p>
    <p v-if="store.invalid" class="b-form_response-invalid">
      Please use letters only, no numbers or special characters...
    </p>
  </section>
</template>

<script setup >
import { ref, computed } from 'vue'
import { useSearchStore } from '../stores/SearchStore'
const store = useSearchStore()

// WORD SUBMISSION
const word = ref('')

const handleSubmit = () => {
  const reg = new RegExp('^[a-zA-Z]+$')
  if (word.value === '') {
    store.handleEmpty()
    word.value = ''
    return
  }
  if (reg.test(word.value)) {
    store.searchDictionary(word.value)
  } else {
    word.value = ''
    store.handleInvalid()
  }
  word.value = ''
}

// INPUT STYLING
const isHover = ref(false)
const isFocus = ref(false)

const borderStyle = computed(() => {
  return (isHover.value && store.empty) || store.invalid
    ? '#dd5252'
    : isHover.value && !store.empty && !store.invalid
    ? '#A445ed'
    : isFocus.value && !store.empty && !store.invalid
    ? '#A445ed'
    : 'transparent'
})
const shadowStyle = computed(() => {
  return isFocus.value && !store.empty && !store.invalid
    ? '0 0 7px #a445ed7c'
    : isFocus.value && (store.empty || store.invalid)
    ? '0 0 7px #dd525293'
    : '0 0 0'
})
const handleFocusBlur = (type) => {
  console.log('handle ', type)
  type === 'focus' ? (isFocus.value = true) : (isFocus.value = false)
}
</script>