<template>
  <v-parallax :src="require('../assets/smart-circular-bridge.jpg')" height="100vmin">
    <div style="background: rgba(0,0,0, 0.5); position:absolute" class="h-100 w-100">
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
          <h1 class="text-h2 mb-4">
            Smart Circular Bridge
          </h1>
          <h2 class="subheading  font-weight-thin ">
            Listen to Live-Sound
            <v-icon icon="mdi-cast-audio-variant"></v-icon>
          </h2>

          <v-icon v-if="!audioIsPlaying" @click="audioPlayer.play()" :icon="playIconActive" class="pt-10" style="font-size: 5rem" @mouseover="playIconActive = 'mdi-motion-play'" @mouseleave="playIconActive = 'mdi-motion-play-outline'"></v-icon>
          <v-icon v-if="audioIsPlaying" @click="audioPlayer.pause()"  :icon="playIconActive" class="pt-10" style="font-size: 5rem" @mouseover="playIconActive = 'mdi-motion-pause'" @mouseleave="playIconActive = 'mdi-motion-pause-outline'"></v-icon>

          <!-- <img :src="require('../assets/motion-play-outline.svg')" alt="play" style="width: 100px" class="pt-5"> -->
          <audio id="audioPlayer">
            <source src="http://ulm-smart-bridge.de:8000/stream"/>
          </audio>
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
      })
      this.audioPlayer.addEventListener("playing", () => {
        this.audioIsPlaying = true
      })
    },
    data() {
      return {
        message: 'Hello from MyComponent!',
        playIconActive: 'mdi-motion-play-outline',
        pauseIconActive: 'mdi-motion-pause-outline',
        audioIsPlaying: false,
        audioPlayer: null
      }
    },
    methods: {
    }
  }
  </script>
  
  <style scoped>
  </style>
  