<template>
  <div id="style-selectors" class="san-serif">
    <!-- FONTS -->
    <h2>FONTS:</h2>
    <p>
      <button @click="toggleFont('sanSerif')">San Serif</button>
      <button @click="toggleFont('serif')">Serif</button>
      <button @click="toggleFont('mono')">mono</button>
    </p>
    <!-- COLORS -->
    <h2>COLORS:</h2>
    <p>
      <button @click="toggleTheme('dark')">Dark</button>
      <button @click="toggleTheme('light')">Light Mode</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'style-selectors',

  methods: {
    toggleTheme(theme) {
      console.log('toggleTheme: ', theme)
      //   this.htmlElData.dataset.theme = theme
      this.$emit('setTheme', theme)
      //   localStorage.setItem('theme', theme)
    },
    toggleFont(font) {
      console.log('toggleFont: ', font)
      //   this.htmlElData.dataset.font = font
      //   localStorage.setItem('font', font)
      this.$emit('setFont', font)
    }
  }
}
</script>

<style>
</style>