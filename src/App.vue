<template>
  <div id="app">
    <main>
      <ParallaxBackground />
      <v-card>
        <v-tabs v-model="tab" align-tabs="center" color="#97B28A">
          <v-tab :value="1">Sound-Konzept</v-tab>
          <v-tab :value="2">Smart Circular Bridge</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item :value="1">
            <!-- <InteractiveComponent /> -->
            <AudioInfoComponent />
            <!-- <AudioSpecialComponent /> -->
          </v-tabs-window-item>
          <v-tabs-window-item :value="2">
            <TimelineComponent />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>

      <v-divider></v-divider>

      <!-- <div class="main-container mx-5">
        <div class="info-abstract text-left my-6">
          <h1 class="py-2">
            Weitere Brücken geplant
          </h1>
          <p class="pb-2">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div> -->


      <SlideCards />



      <FooterBottom />

    </main>

  </div>
</template>

<script>
import ParallaxBackground from './components/Parallax.vue'
import FooterBottom from './components/Footer.vue'
// import SlideCards from './components/SlideCards.vue'
import TimelineComponent from './components/Timeline.vue'
import AudioInfoComponent from './components/AudioInfo.vue'
// import AudioSpecialComponent from './components/AudioSpecial.vue'
// import InteractiveComponent from './components/InteractiveComponent.vue'



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
    // InteractiveComponent,
    // SlideCards,
    // AudioSpecialComponent
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
  background: #97B28A;
  color: white;
  padding: 20px;
}

p {margin-bottom: 1rem}


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