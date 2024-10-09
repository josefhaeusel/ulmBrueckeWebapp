<template>
  <div id="app">
    <main>
      <ParallaxBackground />
      <v-card>
        <v-tabs v-model="tab" align-tabs="center" color="blue">
          <v-tab :value="1">Sound-Konzept</v-tab>
          <v-tab :value="2">Brücken-Informationen</v-tab>
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

      <v-divider></v-divider>


      <div class="main-container">
        <div class="info-abstract text-left my-6">
          <h1 class="py-2">
            Weitere Brücken geplant
          </h1>
          <p class="pb-2">
            Im Sommer 2023 soll im Rahmen des Projekts zunächst eine Brücke aus Flachs in Ulm errichtet werden. Ein Jahr
            später soll die dritte und letzte Brücke in Bergen op Zoom in den Niederlanden eröffnet werden. Dabei wollen
            die Forscherinnen und Forscher jeweils die bereits gewonnenen Daten und Erkenntnisse aus dem vorherigen
            Brückenbau berücksichtigen – und so Schritt für Schritt einen Baustoff der Zukunft entwickeln.
          </p>
        </div>
      </div>

      <SlideCards />



      <FooterBottom />

    </main>

  </div>
</template>

<script>
import ParallaxBackground from './components/Parallax.vue'
import FooterBottom from './components/Footer.vue'
import SlideCards from './components/SlideCards.vue'
import TimelineComponent from './components/Timeline.vue'
import AudioInfoComponent from './components/AudioInfo.vue'



export default {
  data: () => ({
    tab: 1,
  }),
  name: 'App',
  components: {
    ParallaxBackground,
    TimelineComponent,
    AudioInfoComponent,
    FooterBottom,
    SlideCards
  }
};

</script>


<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /* color: #083057; */
}

header {
  background: #42b983;
  color: white;
  padding: 20px;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-items: center; */
}

.info-abstract {
  max-width: 1000px;
  width: 100%;
  align-self: center;
}
</style>