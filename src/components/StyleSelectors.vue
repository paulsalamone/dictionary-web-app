<template>
  <div id="style-selectors">
    <!-- FONTS -->
    <div id="fonts">
      <select v-model="currentFont" id="font-selector">
        <option value="san-serif">Sans Serif</option>
        <option value="serif">Serif</option>
        <option value="mono">Mono</option>
      </select>
    </div>
    <div id="colors">
      <!-- COLORS -->
      <div :class="`toggler toggler-${currentTheme}`" @click="toggleTheme()">
        <div :class="`knob knob-${currentTheme}`"></div>
      </div>
      <img src="../assets/images/icon-moon.svg" alt="moon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'style-selectors',
  data() {
    return {
      currentFont: null,
      currentTheme: null
      //   togglerStyle: null
    }
  },
  //   computed: {
  //     currentTheme() {
  //       return localStorage.getItem('theme')
  //     }
  //   },
  mounted() {
    this.currentFont = localStorage.getItem('font')

    this.currentTheme = localStorage.getItem('theme')

    this.currentTheme === 'light'
      ? (this.togglerStyle = 'toggler-light')
      : (this.togglerStyle = 'toggler-dark')
  },
  watch: {
    currentFont(val) {
      this.$emit('setFont', val)
    }
    // togglerStyle(val) {
    //   console.log(' WATCH toggler style', val)
    // }
  },
  methods: {
    toggleTheme() {
      this.currentTheme === 'dark' ? (this.currentTheme = 'light') : (this.currentTheme = 'dark')

      console.log('UHHH', this.currentTheme)
      localStorage.setItem('theme', this.currentTheme)

      this.$emit('setTheme', this.currentTheme)
    },
    selectFont(value) {
      this.$emit('setFont', value)
    }
  }
}
</script>

<style>
</style>