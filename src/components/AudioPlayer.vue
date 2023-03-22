<template>
  <div v-if="showAudio" class="b-audio">
    <div class="b-audio__play">
      <div class="b-audio__play-circle"></div>
      <img src="../assets/images/icon-play.svg" alt="" :key="audioFile" @click="handlePlay" />
      <audio :key="audioFile" id="audio-player">
        <source :src="audioFile ?? audioFile" type="audio/mp3" />
      </audio>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({ phonetics: Object })

const audioFile = ref(null)
const firstAudioFile = ref(null)
const showAudio = ref(true)

onMounted(() => {
  getAudioFile()
})

watch(
  () => props.phonetics,
  () => {
    getAudioFile()
  }
)

const handlePlay = () => {
  document.getElementById('audio-player').play()
}

const getAudioFile = () => {
  const phoneticsArray = JSON.parse(JSON.stringify(props.phonetics))
  firstAudioFile.value = phoneticsArray.filter((e) => e.audio.length > 0)
  if (firstAudioFile.value.length > 0) {
    audioFile.value = firstAudioFile.value[0].audio
    showAudio.value = true
  } else {
    audioFile.value = ''
    showAudio.value = false
  }
}
</script>


