<template>
  <div class="b-style-selectors">
    <FontSelector />
    <div class="b-colors">
      <div :class="`b-colors__toggler b-colors__toggler-${currentTheme}`" @click="toggleTheme()">
        <div :class="`b-colors__knob b-colors__knob-${currentTheme}`"></div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
        <path
          fill="none"
          :stroke="strokeColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import FontSelector from './FontSelector.vue'

export default {
  name: 'style-selectors',
  components: { FontSelector },
  data() {
    return {
      currentFont: null,
      currentTheme: null,
      store: null
    }
  },

  mounted() {
    this.currentFont = localStorage.getItem('font')

    this.currentTheme = localStorage.getItem('theme')

    this.currentTheme === 'light'
      ? (this.togglerStyle = 'toggler-light')
      : (this.togglerStyle = 'toggler-dark')
  },
  computed: {
    strokeColor() {
      return this.currentTheme === 'light' ? '#838383' : '#A445ed'
    }
  },
  methods: {
    toggleTheme() {
      this.currentTheme === 'dark' ? (this.currentTheme = 'light') : (this.currentTheme = 'dark')

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