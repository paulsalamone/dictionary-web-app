<template>
  <div v-if="showAudio">
    <img src="../assets/images/icon-play.svg" alt="" :key="audioFile" @click="handlePlay" />
    <audio :key="audioFile" id="audio-player">
      <source :src="audioFile ?? audioFile" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
import { useSearchStore } from '../stores/SearchStore'

export default {
  name: 'audio-player',
  props: {
    phonetics: {
      type: Object
    }
  },
  data() {
    return {
      store: null,
      audioFile: null,
      showAudio: true
    }
  },
  watch: {
    phonetics() {
      this.audioFile = ''
      const phoneticsArray = JSON.parse(JSON.stringify(this.phonetics))
      //   console.log(phoneticsArray)

      this.firstAudioFile = phoneticsArray.filter((e) => e.audio.length > 0)

      // console.log('this.audioFile', this.firstAudioFile.length)

      if (this.firstAudioFile.length > 0) {
        this.audioFile = this.firstAudioFile[0].audio
        // console.log('this.audioFile', this.audioFile)
        this.showAudio = true
      } else {
        this.audioFile = ''
        this.showAudio = false
      }
    }
  },
  mounted() {
    // console.log('MOUNTED')
    this.store = useSearchStore()
    // why the hell is this here?
    // this.store.searchDictionary('dictionary')
  },

  methods: {
    handlePlay() {
      document.getElementById('audio-player').play()
    }
  }
}
</script>

<style>
</style>