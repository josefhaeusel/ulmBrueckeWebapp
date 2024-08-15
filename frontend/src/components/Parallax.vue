<template>
  <div>

    <div class="parallax-video-container rounded-b-lg" ref="parallaxContainer">
      <div style="position:absolute; background:rgba(0,0,0,0.5)"  class="h-100 w-100 d-flex align-center justify-center">
        <video autoplay muted loop class="parallax-video" ref="parallaxVideo">
          <source :src="require('../assets/banner_video.mp4')" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      <div class="parallax-content">
        <div class="d-flex flex-column fill-height justify-center align-center text-white">
            <h1 class="text-h2 mb-4">
              Smart Circular Bridge
            </h1>
            <h2 class="subheading font-weight-thin">
              Listen to Live-Sound
              <v-icon icon="mdi-cast-audio-variant"></v-icon>
            </h2>

            <div class="d-flex pt-10 align-center" style="height:80px">
              <v-icon v-if="!audioIsPlaying && !audioIsLoading" @click="startStream" :icon="playIconActive" style="font-size: 5rem" @mouseover="playIconActive = 'mdi-motion-play'" @mouseleave="playIconActive = 'mdi-motion-play-outline'"></v-icon>
              <v-icon v-if="audioIsPlaying && !audioIsLoading" @click="audioPlayer.pause()" :icon="playIconActive" style="font-size: 5rem" @mouseover="playIconActive = 'mdi-motion-pause'" @mouseleave="playIconActive = 'mdi-motion-pause-outline'"></v-icon>
              <v-progress-circular v-if="audioIsLoading" color="primary" indeterminate size="50"></v-progress-circular>
            </div>
            <audio id="audioPlayer">
              <source src="http://ulm-smart-bridge.de:8000/stream"/>
            </audio>
          </div>
      </div>
    </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'ParallaxBackground',
  data() {
    return {
      playIconActive: 'mdi-motion-play-outline',
      audioIsPlaying: false,
      audioIsLoading: false,
      audioPlayer: null,
    };
  },
  mounted() {
    this.audioPlayer = document.getElementById('audioPlayer');
    this.audioPlayer.addEventListener('pause', () => {
      this.audioIsPlaying = false;
      this.audioIsLoading = false;
    });
    this.audioPlayer.addEventListener('waiting', () => {
      this.audioIsPlaying = false;
      this.audioIsLoading = true;
    });
    this.audioPlayer.addEventListener('playing', () => {
      this.audioIsPlaying = true;
      this.audioIsLoading = false;
    });


    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);

  },
  methods: {
    startStream() {
      const buffered = this.audioPlayer.buffered;
      if (buffered.length > 0) {
        this.audioPlayer.currentTime = buffered.end(buffered.length - 1);
      }
      this.audioPlayer.play();
    },
    handleScroll() {
      const container = this.$refs.parallaxContainer;
      const video = this.$refs.parallaxVideo;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const containerRect = container.getBoundingClientRect();
      const offsetTop = containerRect.top + scrollTop;

      // Adjust the translateY value based on scroll position
      const parallaxSpeed = 0.9; // Adjust this value for more or less parallax effect
      const translateY = (scrollTop - offsetTop) * parallaxSpeed;

      video.style.transform = `translate3d(-50%, ${translateY}px, 0)`;
    },
  },
};
</script>

<style scoped>
.parallax-video-container {
  position: relative;
  overflow: hidden;
  min-height: 500px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.parallax-video {
  position: absolute;
  left: 50%;
  z-index: -1;
}

.parallax-content {
  position: relative;
  z-index: 1;
  text-align: center;
}
</style>