<template>
  <div class="b-wrapper">
    <header class="b-header">
      <img
        src="./assets/images/logo.svg"
        alt="dictionary logo"
        class="b-header__logo"
        @click="handleReload()"
      />
      <StyleSelectors :html-el="htmlEl" />
    </header>
    <main class="b-main">
      <SearchBox />
      <DefinitionView />
    </main>
  </div>
</template>

<script setup>
import SearchBox from './components/SearchBox.vue'
import StyleSelectors from './components/StyleSelectors.vue'
import DefinitionView from './components/DefinitionView.vue'
import { ref, onMounted } from 'vue'

import { useSearchStore } from './stores/SearchStore'
const store = useSearchStore()
const htmlEl = ref(null)

store.searchDictionary('dictionary')

onMounted(() => {
  htmlEl.value = document.getElementsByTagName('html')[0]

  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'light')
    htmlEl.value.dataset.theme = 'light'
  } else {
    htmlEl.value.dataset.theme = localStorage.getItem('theme')
  }
  if (localStorage.getItem('font') === null) {
    localStorage.setItem('font', 'san-serif')
    htmlEl.value.dataset.font = 'san-serif'
  } else {
    htmlEl.value.dataset.font = localStorage.getItem('font')
  }
})

const handleReload = () => {
  store.searchDictionary('keyboard')
}
</script>

