<template>
  <div class="b-style-selectors">
    <div class="b-fonts">
      <select class="b-fonts__select" v-model="currentFont">
        <option value="san-serif">Sans Serif</option>
        <option value="serif">Serif</option>
        <option value="mono">Mono</option>
      </select>
    </div>
    <div class="b-colors">
      <div :class="`b-colors__toggler b-colors__toggler-${currentTheme}`" @click="toggleTheme()">
        <div :class="`b-colors__knob b-colors__knob-${currentTheme}`"></div>
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
    }
  },
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