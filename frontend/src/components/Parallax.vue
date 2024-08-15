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

          <div class="pt-10" >
            <v-icon v-if="!audioIsPlaying && !audioIsLoading" @click="audioPlayer.play()" :icon="playIconActive" style="font-size: 5rem" @mouseover="playIconActive = 'mdi-motion-play'" @mouseleave="playIconActive = 'mdi-motion-play-outline'"></v-icon>
            <v-icon v-if="audioIsPlaying && !audioIsLoading" @click="audioPlayer.pause()"  :icon="playIconActive" style="font-size: 5rem" @mouseover="playIconActive = 'mdi-motion-pause'" @mouseleave="playIconActive = 'mdi-motion-pause-outline'"></v-icon>
            <v-progress-circular v-if="audioIsLoading" color="primary" indeterminate size="40"></v-progress-circular>
          </div>
          <!-- <img :src="require('../assets/motion-play-outline.svg')" alt="play" style="width: 100px" class="pt-5"> -->
          <audio id="audioPlayer">
            <source src="http://ulm-smart-bridge.de:8000/stream"/>
          </audio>
          <av-line :line-width="2" line-color="blue" src="http://ulm-smart-bridge.de:8000/stream"></av-line>

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
      this.audioPlayer.addEventListener("paused", () => {
        this.audioIsPlaying = false
        this.audioIsLoading = false
      })
      this.audioPlayer.addEventListener("waiting", () => {
        this.audioIsPlaying = false
        this.audioIsLoading = true
      })
      this.audioPlayer.addEventListener("loading", () => {
        this.audioIsPlaying = false
        this.audioIsLoading = true

      })
      this.audioPlayer.addEventListener("playing", () => {
        this.audioIsPlaying = true
        this.audioIsLoading = false
        //loading  ui logic
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
    }
  }
  </script>
  
  <style scoped>
   audio{
    display:none
   }
  </style>

  