<template>
  <div>
    <!-- <p>{{ phonetics2 }}</p> -->
    <div v-for="(phonetic, index) in phonetics" :key="index">
      <div v-if="phonetic.audio">
        <img
          src="../assets/images/icon-play.svg"
          alt=""
          :key="phonetic.audio"
          @click="handlePlay"
        />
        <audio :key="phonetic.audio" id="audio-player">
          <source :src="phonetic.audio ?? phonetis.audio" type="audio/mp3" />
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'audio-player',
  props: {
    phonetics: {
      type: Object
    }
  },
  computed: {
    // phonetics2() {
    //   const arr = Array.from(this.phonetics)
    //   //   const answer = arr.find((e) => {
    //   //     e.audio !== ''
    //   //     return answer
    //   //   })
    //   return arr
    // }
    // audioPlayer() {
    //   console.log('Array.from(this.phonetics)', Array.from(this.phonetics))
    //   const arr = Array.from(this.phonetics)
    //   //   console.log(arr)
    //   const bob = arr.filter((e) => e.audio.length > 0)
    //   console.log('bob', bob)
    //   return bob
    //   //   return Array.from(this.phonetics).find((e) => e.audio.length > 0)
    // }
  },
  //   watch: {
  //     audioPlayer(val) {
  //       console.log('AP ', val)
  //     }
  //   },
  mounted() {
    // console.log('MOUNTED', this.audioPlayer)
  },
  //   watch: {
  //     audioPlayer(val) {
  //       console.log('audioPlayer val', val)
  //     }
  //   },

  methods: {
    handlePlay() {
      //   console.log('handle play')
      document.getElementById('audio-player').play()
    }
  }
}
</script>

<style>
</style>