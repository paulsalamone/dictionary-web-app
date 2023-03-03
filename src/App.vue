<template>
  <div id="wrapper" class="choose-san-serif">
    <header>
      <img src="./assets/images/logo.svg" alt="dictionary logo" />
      <StyleSelectors :html-el="htmlEl" @set-theme="handleTheme" @set-font="handleFont" />
    </header>

    <main>
      <SearchBox />
      <DefinitionView />
      <NoDefinitionsView />
      <ErrorView />
    </main>
  </div>
</template>

<script >
import SearchBox from './components/SearchBox.vue'
import StyleSelectors from './components/StyleSelectors.vue'
import DefinitionView from './components/DefinitionView.vue'
import NoDefinitionsView from './components/NoDefinitionsView.vue'
import ErrorView from './components/ErrorView.vue'

export default {
  name: 'app',
  components: { SearchBox, StyleSelectors, DefinitionView, NoDefinitionsView, ErrorView },
  data() {
    return {
      htmlEl: null
    }
  },
  mounted() {
    this.htmlEl = document.getElementsByTagName('html')[0]
    const themeProperty = localStorage.getItem('theme')
    const fontProperty = localStorage.getItem('font')
    console.log(themeProperty, fontProperty)

    if (themeProperty) {
      this.htmlEl.dataset.theme = themeProperty
    }
    if (fontProperty) {
      this.htmlEl.dataset.font = fontProperty
    }
  },
  methods: {
    handleTheme(theme) {
      console.log('handleTheme theme:', theme)
      localStorage.setItem('theme', theme)
      this.htmlEl.dataset.theme = theme
    },
    handleFont(font) {
      console.log('handleFont font: ', font)
      localStorage.setItem('font', font)
      this.htmlEl.dataset.font = font
    }
  }
}
</script>

