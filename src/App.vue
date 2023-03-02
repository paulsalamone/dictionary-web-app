<template>
  <div id="wrapper">
    <header>
      <!-- dictionary icon -->
      <img src="./assets/images/logo.svg" alt="dictionary logo" />
      <!-- font selector -->
      <!-- dark mode -->
      <StyleSelectors />
    </header>

    <main>
      <!-- SEARCH BOX -->
      <h1>DICTIONARY</h1>
      <SearchBox />

      <!-- DEFINITION VIEW -->
      <!-- word / pronunication -->
      <!-- definitions -->

      <!-- ERROR VIEW -->

      <!-- BLANK VIEW -->
    </main>
  </div>
</template>

<script >
import SearchBox from './components/SearchBox.vue'
import StyleSelectors from './components/StyleSelectors.vue'

export default {
  name: 'app',
  components: { SearchBox, StyleSelectors }
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
