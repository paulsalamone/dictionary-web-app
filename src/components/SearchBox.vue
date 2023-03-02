<template>
  <section id="search-box">
    <form action="" @submit.prevent="handleSubmit()">
      <input type="text" placeholder="enter word" v-model="searchText" />
      <button type="submit">go</button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'search-box',
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.searchText)

      // VALIDATE TEXT

      // SUBMIT TO API

      // HANDLE ERRORS

      //   RESET TEXT
      this.searchText = ''
    }
  }
}
</script>

<style>
</style>