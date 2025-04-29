<template>
  <div id="app">
    <main :class="{ blurred: dialog }">
      <div>
        <ParallaxBackground />
        <v-card>
          <v-tabs v-model="tab" align-tabs="center" class="elevation-1" color="rgb(151, 178, 138)" @click="stopAudioChild(); stopVideos()">
            <v-tab  class="main-tab-a" :value="1">Sound-Konzept</v-tab>
            <v-tab class="main-tab-b" :value="2">Smart Circular Bridge</v-tab>
          </v-tabs>

          <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="1">
              <AudioInfoComponent ref="audioInfo"/>
            </v-tabs-window-item>
            <v-tabs-window-item :value="2">
              <TimelineComponent />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>
      </div>
      <FeedbackWidget />
      <FooterBottom />
    </main>


    <!-- <v-dialog v-model="dialog" width="auto" persistent>
      <v-card class="my-2 mx-2" elevation="4">
        <v-card-title class="text-h4 text-white d-flex align-center justify-center" text-color="white"
          style="background-color: #97B28A;">
          {{ modiTitle }}
        </v-card-title>
        <v-card-text class="align-center justify-center">
          {{ modiText }}
        </v-card-text>
        <template v-slot:actions>
          <v-btn class="ms-auto" style="justify-self: center;" text @click="checkPassword">OK</v-btn>
        </template>
      </v-card>
    </v-dialog> -->
<!-- 
    <v-dialog v-model="dialog" width="auto" persistent>
      <v-card class="my-2 mx-2" elevation="4" style="width:300px">
        <v-card-title class="text-h4 text-white d-flex align-center justify-center" text-color="white"
          style="background-color: #97B28A;">
           Log-In
        </v-card-title>


        <p v-if="errorMessage" class="text-red">{{ errorMessage }}</p>
        <template v-slot:actions>
          <v-text-field v-model="passwordInput" label="Enter Password" type="password" outlined dense @input="checkPassword"></v-text-field>
        </template>
      </v-card>
    </v-dialog> -->
    <!-- <v-dialog v-model="dialog" width="auto" persistent>
      <v-card class="my-2 mx-2" elevation="4">
        <v-card-title class="text-h4 text-white d-flex align-center justify-center" text-color="white"
          style="background-color: #97B28A;">
          Login
        </v-card-title>
        <v-card-text class="align-center justify-center">
          <v-text-field v-model="passwordInput" label="Enter Password" type="password" outlined dense
            @keyup.enter="checkPassword"></v-text-field>
          <p v-if="errorMessage" class="text-red">{{ errorMessage }}</p>
        </v-card-text>
        <template v-slot:actions>
          <v-btn class="ms-auto" style="justify-self: center;" text @click="checkPassword">
            OK
          </v-btn>
        </template>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import ParallaxBackground from './components/Parallax.vue'
import FooterBottom from './components/Footer.vue'
import TimelineComponent from './components/Timeline.vue'
import AudioInfoComponent from './components/AudioInfo.vue'
import FeedbackWidget from './components/FeedbackWidget.vue'

export default {
  data: () => ({
    tab: 1,
    currentRoute: window.location.pathname,
    dialog: false,
    passwordInput: "",
    correctPassword: "scb25", // Change this to your actual password
    modiTitle: "",
    modiText: ""
  }),
  name: 'App',
  components: {
    ParallaxBackground,
    TimelineComponent,
    AudioInfoComponent,
    FooterBottom,
    FeedbackWidget
  },
  created() {
    this.setModiContent();
    this.dialog = true; //Den Dialog beim laden der seite gleich öffnen

  },
  methods: {
    stopAudioChild(){
      this.$refs.audioInfo?.stopAudioChild()
    },

    stopVideos() {
      const videos = document.getElementsByName("video")
      console.log("VIDEOS", videos)
      videos.forEach( (video) => {
        video.pause()
      })
    },
    checkPassword(){
      if( this.passwordInput == this.correctPassword){
        this.dialog = false
      }
    },
    setModiContent() {
      const currentHour = new Date().getHours();

      if (currentHour >= 15 && currentHour < 16) {
        this.modiTitle = "Gaming-Modus";
        this.modiText = "Aktuell ist der Gaming-Modus aktiv.";
      } else if (currentHour >= 18 && currentHour < 19) {
        this.modiTitle = "Percussion-Modus";
        this.modiText = "Aktuell ist der Percussion-Modus aktiv.";
      } else {
        this.modiTitle = "Nature-Modus";
        this.modiText = "Aktuell ist der Nature Soundmodus aktiv.";
      }
    }
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  background: #97B28A;
  color: white;
  padding: 20px;
}

.main-tab-a {
  font-size: 18px !important;
  width: 50dvw
}

.main-tab-b {
  font-size: 18px !important;
  width: 50dvw
}



@media (max-width: 500px) {
  .main-tab-a {
  font-size: 13px !important;
  width: 40dvw !important
}

.main-tab-b {
  font-size: 13px !important;
  width: 60dvw !important
}

}

h1 {
  font-size: 2em;
}

p {
  margin-bottom: 1rem;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-abstract {
  max-width: 1000px;
  width: 100%;
  align-self: center;
}

Hintergund verschwimmen lassen .blurred {
  filter: blur(0.1px);
  pointer-events: none;
}

@media only screen and (max-width: 500px) {
  h1 {
    font-size: 1.5em;
  }
}

@media (max-width: 500px) {
    .v-card .v-card-title {
        font-size: 24px !important;
    }
}
</style>