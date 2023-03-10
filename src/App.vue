<template>
  <div id="wrapper" class="choose-san-serif">
    <header>
      <img src="./assets/images/logo.svg" alt="dictionary logo" />
      <StyleSelectors :html-el="htmlEl" @set-theme="handleTheme" @set-font="handleFont" />
    </header>

    <main>
      <SearchBox />
      <DefinitionView />
    </main>
  </div>
</template>

<script >
import SearchBox from './components/SearchBox.vue'
import StyleSelectors from './components/StyleSelectors.vue'
import DefinitionView from './components/DefinitionView.vue'

import { useSearchStore } from './stores/SearchStore'
// const store = useSearchStore()

export default {
  name: 'app',
  components: { SearchBox, StyleSelectors, DefinitionView },
  data() {
    return {
      htmlEl: null
    }
  },
  mounted() {
    this.htmlEl = document.getElementsByTagName('html')[0]

    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', 'light')
      this.htmlEl.dataset.theme = 'light'
    } else {
      this.htmlEl.dataset.theme = localStorage.getItem('theme')
    }
    if (localStorage.getItem('font') === null) {
      localStorage.setItem('font', 'san-serif')
      this.htmlEl.dataset.font = 'san-serif'
    } else {
      this.htmlEl.dataset.font = localStorage.getItem('font')
    }
    const store = useSearchStore()

    store.searchDictionary('dictionary')
  },
  methods: {
    handleTheme(theme) {
      // console.log('handleTheme theme:', theme)
      localStorage.setItem('theme', theme)
      this.htmlEl.dataset.theme = theme
    },
    handleFont(font) {
      localStorage.setItem('font', font)
      this.htmlEl.dataset.font = font
    }
  }
}
</script>

