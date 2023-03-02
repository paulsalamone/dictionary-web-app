<template>
  <div id="wrapper">
    <header>
      <img src="./assets/images/logo.svg" alt="dictionary logo" />
      <StyleSelectors />
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
  components: { SearchBox, StyleSelectors, DefinitionView, NoDefinitionsView, ErrorView }
}
</script>

