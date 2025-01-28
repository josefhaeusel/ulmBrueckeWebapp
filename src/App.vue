<template>
  <div id="app">
    <main :class="{ blurred: dialog }">
      <div v-if="currentRoute === '/'">
        <ParallaxBackground />
        <v-card>
          <v-tabs v-model="tab" align-tabs="center" color="#97B28A">
            <v-tab :value="1">Sound-Konzept</v-tab>
            <v-tab :value="2">Smart Circular Bridge</v-tab>
          </v-tabs>

          <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="1">
              <AudioInfoComponent />
            </v-tabs-window-item>
            <v-tabs-window-item :value="2">
              <TimelineComponent />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>
      </div>
      <div v-else-if="currentRoute === '/impressum'">
        <ImpressumComponent />
      </div>
      <div v-else>
        <h1>404 - Page Not Found</h1>
      </div>
      <FooterBottom />
    </main>

    
    <v-dialog
      v-model="dialog"
      width="auto"
      persistent
    >
      <v-card class="my-2 mx-2" elevation="4">
        <v-card-title class="text-h4 text-white d-flex align-center justify-center" text-color="white" style="background-color: #97B28A;">
          {{ modiTitle }}
        </v-card-title>
        <v-card-text class="align-center justify-center">
          {{ modiText }}
        </v-card-text>
        <template v-slot:actions>
          <v-btn class="ms-auto" style="justify-self: center;" text @click="dialog = false">OK</v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ParallaxBackground from './components/Parallax.vue'
import FooterBottom from './components/Footer.vue'
import TimelineComponent from './components/Timeline.vue'
import AudioInfoComponent from './components/AudioInfo.vue'
import ImpressumComponent from './components/Impressum.vue'

export default {
  data: () => ({
    tab: 1,
    currentRoute: window.location.pathname,
    dialog: false,
    modiTitle: "",
    modiText: ""
  }),
  name: 'App',
  components: {
    ParallaxBackground,
    TimelineComponent,
    AudioInfoComponent,
    FooterBottom,
    ImpressumComponent
  },
  created() {
    this.setModiContent();
    this.dialog = true; //Den Dialog beim laden der seite gleich öffnen
  },
  methods: {
    setModiContent() {
      const currentHour = new Date().getHours();

      if (currentHour >= 15 && currentHour < 16) {
        this.modiTitle = "Gaming-Modus";
        this.modiText = "Aktuell ist der Gaming-Modus aktiv :)))";
      } else if (currentHour >= 18 && currentHour < 19) {
        this.modiTitle = "Percussion-Modus";
        this.modiText = "Aktuell ist der Percussion-Modus aktiv :)))";
      } else {
        this.modiTitle = "Nature-Modus";
        this.modiText = "Aktuell ist der Nature Soundmodus aktiv :)))";
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

Hintergund verschwimmen lassen
.blurred {
  filter: blur(0.1px);
  pointer-events: none;
}
</style>