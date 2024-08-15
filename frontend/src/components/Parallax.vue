<template>
  <v-parallax :src="require('../assets/smart-circular-bridge.jpg')" height="80vmin" class="rounded-b-lg">
    <div style="background: rgba(0,0,0, 0.5); position:absolute" class="h-100 w-100">
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
          <h1 class="text-h2 mb-4">
            Smart Circular Bridge
          </h1>
          <h2 class="subheading  font-weight-thin ">
            Listen to Live-Sound
            <v-icon icon="mdi-cast-audio-variant"></v-icon>
          </h2>

          <div class="d-flex pt-10 align-center" style="height:80px">
            <v-icon v-if="!audioIsPlaying && !audioIsLoading" @click="startStream" :icon="playIconActive" style="font-size: 5rem" @mouseover="playIconActive = 'mdi-motion-play'" @mouseleave="playIconActive = 'mdi-motion-play-outline'"></v-icon>
            <v-icon v-if="audioIsPlaying && !audioIsLoading" @click="audioPlayer.pause()"  :icon="playIconActive" style="font-size: 5rem" @mouseover="playIconActive = 'mdi-motion-pause'" @mouseleave="playIconActive = 'mdi-motion-pause-outline'"></v-icon>
            <v-progress-circular v-if="audioIsLoading" color="primary" indeterminate size="50"></v-progress-circular>
          </div>
          <!-- <img :src="require('../assets/motion-play-outline.svg')" alt="play" style="width: 100px" class="pt-5"> -->
          <audio id="audioPlayer">
            <source src="http://ulm-smart-bridge.de:8000/stream"/>
          </audio>
          <!-- <av-line :line-width="2" line-color="blue" src="http://ulm-smart-bridge.de:8000/stream"></av-line> -->

          <!-- timeline, waveform... -->
        </div>
      </div>

    
  </v-parallax>
</template>
  
  <script>
  export default {
    name: 'ParallaxBackground',
    mounted() {
      this.audioPlayer = document.getElementById("audioPlayer")
      console.log(this.audioPlayer)
      this.audioPlayer.addEventListener("pause", () => {
        this.audioIsPlaying = false
        this.audioIsLoading = false
      })
      this.audioPlayer.addEventListener("waiting", () => {
        this.audioIsPlaying = false
        this.audioIsLoading = true
      })
      this.audioPlayer.addEventListener("playing", () => {
        this.audioIsPlaying = true
        this.audioIsLoading = false
      })

    },
    data() {
      return {
        message: 'Hello from MyComponent!',
        playIconActive: 'mdi-motion-play-outline',
        pauseIconActive: 'mdi-motion-pause-outline',
        audioIsPlaying: false,
        audioIsLoading: false,
        audioPlayer: null
      }
    },
    methods: {
      startStream(){
        console.log(this.audioPlayer.currentTime)
        const buffered = this.audioPlayer.buffered
        if(buffered.length > 0) {
          this.audioPlayer.currentTime = buffered.end(buffered.length-1)
        }
        this.audioPlayer.play()
      }
    }
  }
  </script>
  
  <style scoped>
  </style>

  