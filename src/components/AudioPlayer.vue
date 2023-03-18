<template>
  <div v-if="showAudio" class="b-audio">
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

      this.firstAudioFile = phoneticsArray.filter((e) => e.audio.length > 0)

      if (this.firstAudioFile.length > 0) {
        this.audioFile = this.firstAudioFile[0].audio
        this.showAudio = true
      } else {
        this.audioFile = ''
        this.showAudio = false
      }
    }
  },
  mounted() {
    this.store = useSearchStore()
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