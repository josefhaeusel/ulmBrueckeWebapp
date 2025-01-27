<template>
  <div class="AudioSpecials mt-5 mx-5 mb-10">

    <v-timeline class="timeline mx-1 my-6" side="end" :direction="timelineDirection"
      :style='`transform: translateX(${timeline.timelinePositionX}); display: ${timeline.timelineDisplay}; opacity: ${timeline.timelineOpacity}`'>
      <v-timeline-item v-for="(module, i) in content_modules" :key="i" :dot-color="getStyle(module.topic).color" fill-dot :size="module.size">
        <template v-slot:opposite>
          <span class="Uhrzeit">{{ module.timelineText }}</span>
        </template>

        <v-card v-if="module.title" class="d-flex" style="width: 250px">
          <div style="width: 100%">
            <v-card-title :style="{ backgroundColor: getStyle(module.topic).color }" :class="['text-h4', 'text-white']" text-color="white">
              {{ module.title }}
            </v-card-title>
            <v-card-text class="bg-white text--primary mt-4">
              <p>{{ module.text }}</p>
            </v-card-text>
          </div>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <!-- <div class="d-flex mx-1 mt-5">

      <div v-for="(module, i) in content_modules" :key="i" v-show=module.showExpansion
        :style='`transform: translateX(${timeline.expansionPositionX}); display: ${timeline.expansionDisplay}; opacity: ${timeline.expansionOpacity}`'
        class="expansion">
        <v-btn prepend-icon="mdi-chevron-left-circle" @click="hideExpansion(module)" size="large" rounded="xl"
          elevation=10 class="my-3" style="z-index:100" :color="getStyle(module.topic).color" variant="tonal">
          Zurück zu allen Aktionen
        </v-btn>
        <div>
          <v-window v-model="module.expansionOnboarding">
            <v-window-item v-for="(expansionCard, n) in module.expansionCards" :key="`card-${n}`" :value="n">
              <v-card class="flex-coloumn my-5 mx-5" elevation="4" style="max-width: 1000px">
                <v-card-title :class="['text-h4', `bg-${getStyle(module.topic).color}`, 'text-white']"
                  text-color="white">
                  {{ expansionCard.title }}
                </v-card-title>

                <v-card-text class="my-5 bg-white">
                  <p>{{ expansionCard.text }}</p>
                </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>

          <v-card-actions class="justify-space-between">
            <v-btn icon="mdi-chevron-left" variant="plain" @click="prevCard(module)"></v-btn>
            <v-item-group v-model="module.expansionOnboarding" class="text-center" mandatory>
              <v-item v-for="(card, n) in module.expansionCards" :key="`btn-${n}`" v-slot="{ isSelected, toggle }"
                :value="n">
                <v-btn :variant="isSelected ? 'outlined' : 'text'" icon="mdi-record" @click="toggle"></v-btn>
              </v-item>
            </v-item-group>
            <v-btn icon="mdi-chevron-right" variant="plain" @click="nextCard(module)"></v-btn>
          </v-card-actions>
        </div>

      </div>
    </div> -->

  </div>
</template>
<script>

export default {
  name: "SpecialAudio",
  data: () => ({
    timeline: {
      showTimeline: true,
      timelinePositionX: '-10px',
      timelineDisplay: '',
      timelineOpacity: '1',
      expansionPositionX: '100%',
      expansionDisplay: '',
      expansionOpacity: '0',
      showSoundInformation: false,
    },
    content_modules: [
    { topic: 'Experimental',
    size: "x-small",
    timelineText: ''},
      {
        topic: 'Gaming',
        title: 'Gaming',
        text: 'Tauchen Sie in die Welt nostalgischer Videospiel-Sounds ein!',
        timelineText: '15-16 Uhr',
        size: "default",
        // showExpansion: false,
        // expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        // expansionOnboarding: 0,
        // expansionCards: [
        //   { title: 'Gamingsounds', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' },
        // ],
        cover: 'flax-matten.jpg'
      },
     
      {
        topic: 'Experimental',
        title: 'Nature',
        text: 'Erleben Sie eine natürliche Klangfarbe, kombiniert mit subtilen technischen Akzenten.',
        timelineText: 'außerhalb der Specials',
        size: "default",

        // showExpansion: false,
        // expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        // expansionOnboarding: 0,
        // expansionCards: [
        //   { title: 'Experimental', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' },
        // ],
        cover: 'card1.jpg'
      },
      {
        topic: 'Percussion',
        title: 'Percussions',
        text: 'Kreieren Sie rhythmische Patterns mit Percussion-Instrumenten.',
        timelineText: '18-19 Uhr',
        size: "default",
        cover: 'card1.jpg'
      },
      { topic: 'Experimental',
      timelineText: '',
    size: "x-small"},
    ],
    topicStyles: {
      Gaming: {
        color: '#68272A',
      },
      Percussion: {
        color: '#D67B2A',
      },
      Experimental: {
        color: '#97B28A',
      },
    },
      windowWidth: window.innerWidth,  
  }),
  computed: {
    timelineDirection() {
      return this.windowWidth <= 1100 ? 'vertical' : 'horizontal';
    },
    backgroundStyle() {
      return {
        backgroundImage: `url(${require('../assets/rope2_wood.jpg')})`
      };
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    getStyle(topic) {
      return this.topicStyles[topic]
    },
    slideEffect() {

    },
    async showExpansions(module) {
      this.timeline.timelinePositionX = '-120%'
      this.timeline.timelineOpacity = '0'

      await new Promise(resolve => setTimeout(resolve, 200));

      module.showExpansion = true
      this.timeline.expansionDisplay = ''

      this.timeline.timelineDisplay = 'none'
      this.timeline.showTimeline = false
      this.timeline.expansionOpacity = '1'

      await new Promise(resolve => setTimeout(resolve, 50));
      this.timeline.expansionPositionX = '0%'


    },
    async hideExpansion(module) {

      this.timeline.expansionPositionX = '120%'
      this.timeline.expansionOpacity = '0'

      await new Promise(resolve => setTimeout(resolve, 200));
      module.showExpansion = false
      this.timeline.timelineDisplay = ''
      this.timeline.showTimeline = true
      this.timeline.timelineOpacity = '1'

      await new Promise(resolve => setTimeout(resolve, 50));
      this.timeline.timelinePositionX = '-15px'


    },
    nextCard(module) {
      module.expansionOnboarding = module.expansionOnboarding + 1 > module.expansionCards.length - 1
        ? 0
        : module.expansionOnboarding + 1
    },
    prevCard(module) {
      module.expansionOnboarding = module.expansionOnboarding - 1 < 0
        ? module.expansionCards.length - 1
        : module.expansionOnboarding - 1
    }
  },
}
</script>

<style>
.AudioSpecials {
  display: flex;
  justify-content: center;
  align-items: center;
}


.timeline {
  max-width: 1000px;
  padding-inline: 20px;
  transition:
    transform 0.2s ease,
    opacity 0.1s ease;

}


.Uhrzeit {
  color: black;
  font-weight: 800;
  justify-content: center;
}

.v-timeline-item__body  {
  align-self: flex-start !important
}

.expansion {
  transition:
    transform 0.2s ease,
    opacity 0.1s ease;
}

.scrolling-line {
  /* position: absolute */
  transform: translateX(30dvw);
  background-repeat: repeat-Y;
  background-size: contain;
  width: 100%;
  max-width: 50px;
  z-index: 0
}
</style>