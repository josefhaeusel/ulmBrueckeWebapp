<template>
  <div class="main-container mt-5 mx-5 mb-10">

    <div class="text-left info-abstract mx-5">
      <h1 style="padding-bottom: 15px;">
        Lorem ipsum
      </h1>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua.
      </p>
    </div>


    <v-timeline class="timeline mx-1 my-6 w-100" side="end"
      :style='`transform: translateX(${timeline.timelinePositionX}); display: ${timeline.timelineDisplay}; opacity: ${timeline.timelineOpacity}`'>
      <v-timeline-item v-for="(module, i) in content_modules" :key="i" :dot-color="getStyle(module.topic).color"
        fill-dot :icon="getStyle(module.topic).icon" icon-color="white" class="w-100">
        <v-hover v-slot="{ isHovering, props }">
          <v-card class="my-8 cursor-pointer d-flex w-100" style="width: 60vw !important; max-width: 850px"
            @click="showExpansions(module)" :elevation="isHovering ? 16 : 2" v-bind="props">
            <!-- -->
            <div class="w-100">
              <v-card-title
                :class="['text-h4', `bg-${getStyle(module.topic).color}`, `text-white`, 'w-100', 'text-wrap']"
                text-color="white">
                {{ module.title }}
              </v-card-title>


              <v-parallax :src="require(`../assets/${module.cover}`)" class="align-end card-parallax w-100" scale="0.7"
                :gradient="['rgba(0,0,0,0)', 'rgba(0,0,0,.2)', 'rgba(0,0,0,1)']"
                :height="isHovering ? '350px' : '300px'">
                <v-card-text class="text-white mt-4 w-100">
                  <span v-html="module.text"></span>
                </v-card-text>
              </v-parallax>


            </div>

            <v-list-item link @click="showExpansions(module)"
              :class="[`bg-${getStyle(module.topic).color}-lighten-5`, 'text-white']">
              <v-icon icon="mdi-chevron-right-circle" size="large" :color="getStyle(module.topic).color"></v-icon>
            </v-list-item>
          </v-card>
        </v-hover>
      </v-timeline-item>
    </v-timeline>

    <div class="w-100 mt-4" style="max-width:1000px !important">
      <v-btn v-for="(module, i) in content_modules" :key="i" v-show=module.showExpansion
        prepend-icon="mdi-chevron-left-circle" @click="hideExpansion(module)" size="large" rounded="xl" elevation=10
        class="my-3 ml-2" style="z-index:100; width: 280px" :color="getStyle(module.topic).color" variant="tonal">
        Zurück zur Timeline
      </v-btn>
      <v-card-actions class="justify-space-between w-100" v-for="(module, i) in content_modules" :key="i"
        v-show=module.showExpansion>
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

    <div style="max-width:1000px !important">

      <div v-for="(module, i) in content_modules" :key="i" v-show=module.showExpansion
        :style='`transform: translateX(${timeline.expansionPositionX}); display: ${timeline.expansionDisplay}; opacity: ${timeline.expansionOpacity}`'
        class="expansion">

        <div>
          <v-window v-model="module.expansionOnboarding">
            <v-window-item v-for="(expansionCard, n) in module.expansionCards" :key="`card-${n}`" :value="n">
              <v-card class="flex-column my-5 mx-5 expansion-card" elevation="4" style="max-width: 1000px">
                <v-card-title v-if="expansionCard.title"
                  :class="['text-h4', `bg-${getStyle(module.topic).color}`, 'text-white', 'text-wrap']"
                  text-color="white">
                  {{ expansionCard.title }}
                </v-card-title>

                <div class="bg-white" :style="expansionCard.style" :class="expansionCard.class">

                  <div v-for="(content_block, id) in expansionCard.content_blocks" :key="id"
                    :style="content_block.parentstyle">
                    <!-- Adaptive Content -->

                    <v-card-text v-if="content_block.type === 'text'" :style="content_block.style"
                      :class="content_block.class">
                      <p v-if="content_block.type === 'text'" v-html="content_block.data"></p>
                    </v-card-text>

                    <img v-if="content_block.type === 'img'" :src="content_block.data" :style="content_block.style"
                      :class="content_block.class">

                    <video v-if="content_block.type === 'video'" :src="content_block.data" controls :style="content_block.style"
                    :class="content_block.class">
                    </video>
                  </div>
                </div>

              </v-card>
            </v-window-item>
          </v-window>


        </div>

      </div>
    </div>

  </div>
</template>
<script>

export default {
  name: "TimelineComponent",
  data: () => ({
    timeline: {
      showTimeline: true,
      timelinePositionX: '-15px',
      timelineDisplay: '',
      timelineOpacity: '1',

      expansionPositionX: '100%',
      expansionDisplay: '',
      expansionOpacity: '0',

      showSoundInformation: false,
    },
    content_modules: [
      {
        topic: 'Technologie',
        title: 'Die Architektin',
        text: '<em>"Diese Materialentwicklung ist der Anfang einer neuen Art zu bauen."</em> - Hanaa Dahy',
        showExpansion: false,
        cover: 'architekt/2_Platzhalter Portrait Hanaa.png',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        expansionCards: [
          {
            title: 'Prof. Dr. Hanaa Dahy',
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: require('../assets/architekt/2_Platzhalter Portrait Hanaa.png'), style: "margin-bottom: -10px; max-width: 500px", class: 'hanna-portrait' },
            { type: 'text', data: 'Seit vielen Jahren entwickelt die Architektin Hanaa Dahy biobasierte Werkstoffe für das Bauen. Mit vielen Partnern aus Wissenschaft und Industrie erforscht die Architektin immer neue Anwendungen vom Möbelbau bis zur Fassade. Sie hat auch die Ulmer Brücke mitgeprägt.' },
            ]
          },
          {
            title: 'Von Hanaa stammt übrigens auch ...', class: "d-flex flex-column", content_blocks: [
              { type: 'img', data: require('../assets/architekt/3 BioMat.jpg'), parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 700px", class: '' },
              { type: 'text', style: "max-width:700px", data: '... die Idee, so ein besonderes Geländer in Ulm einzusetzen. Die Streben des Geländers bestehen auch aus Flachsfasern. Zum Schutz sind sie mit einem speziellen biobasierten Harz ummantelt. <br><br>Diese Idee wiederum stammt…' }]
          },
          {
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: require('../assets/architekt/4 (c) FibR.jpg'), parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: '... die Idee, so ein besonderes Geländer in Ulm einzusetzen. Die Streben des Geländers bestehen auch aus Flachsfasern. Zum Schutz sind sie mit einem speziellen biobasierten Harz ummantelt. <br><br>Diese Idee wiederum stammt…' }]
          },
          {
            class: "d-flex align-center architektur-4", content_blocks: [
              { type: 'img', data: require('../assets/architekt/5-1 (c) ICD-ITKE-IntCDC Universität Stuttgart.jpg'), parentstyle: "display: flex; justify-content:center", style: "", class: 'uni-bilder' },
              { type: 'text', style: "max-width:500px", data: '... die Idee, so ein besonderes Geländer in Ulm einzusetzen. Die Streben des Geländers bestehen auch aus Flachsfasern. Zum Schutz sind sie mit einem speziellen biobasierten Harz ummantelt. <br><br>Diese Idee wiederum stammt…' },
              { type: 'img', data: require('../assets/architekt/5-2 (c) ICD-ITKE-IntCDC Universität Stuttgart.jpg'), parentstyle: "display: flex; justify-content:center", style: "", class: 'uni-bilder' },]
          },
          { 
            title: "Material und Formensprache",
            class: "d-flex align-center architektur-5", content_blocks: [
            { type: 'img',  data: require('../assets/architekt/6 STACKING CLOUD (c) unklar.jpg'), parentstyle: "display: flex; justify-content:center", style: "max-width: 500px; width: 100%"},
            { type: 'text', style: "max-width: 500px",data: 'Biobasierte Werkstoffe erlauben Designern und Architekten vielseitige Formen. <br> Alle Materialien, egal ob Beton, Stahl oder Holz, haben typische Eigenschaften. Diese Eigenschaften führen bei jeder Materialart zu ganz bestimmten Formen beim Bauen. So sehen Brücken aus Stahl anders aus als Brücken aus Beton. <br> Die Formensprache dieser Materialien wurde vor über hundert Jahren entwickelt.'  },

          
          ]},
          { 
            title: "Die Formensprache der Biokomposite",
            class: "d-flex align-center architektur-6", content_blocks: [
            { type: 'img',  data: require('../assets/architekt/7-1 LightPRO-Shell_BioMat-itke (C) BioMat am ITKE.jpg'), parentstyle: "display: flex; justify-content:center", style: "max-width: 350px; width: 100%"},
            { type: 'text',  style: "max-width: 350px", data: 'Hier ein Beispiel von Hanaa: Was aussieht wie Metall, ist in Wirklichkeit ein Werkstoff aus Pflanzenfasern und synthetischem Harz: elegant, leicht und äußerst stabil!'  },
            { type: 'img',  data: require('../assets/architekt/7-2 LightPRO-Shell_BioMat-itke (C) BioMat am ITKE.jpg'), parentstyle: "display: flex; justify-content:center", style: "max-width: 350px;  width: 100%"},
          ]},
          { 
            class: "d-flex align-center flex-column", content_blocks: [
            { type: 'video',  data: require('../assets/architekt/platzhalter.mp4'), parentstyle: "display: flex; justify-content:center", style:"max-width:700px; width:80vw"},
            { type: 'text',  data: 'Hanaas Projekte zeigen das große Potenzial biobasierter Materialien.', parentstyle: "display: flex; justify-content:center",  style:"max-width:700px"},
          ]},


          // { title: 'Jetzt gilt es, die Formensprache für Biokomposite zu entdecken.', text: 'Hier ein Beispiel von Hanaa: Was aussieht wie Metall, ist in Wirklichkeit ein Werkstoff aus Pflanzenfasern und synthetischem Harz: elegant, leicht und äußerst stabil!' },
          // { text: 'Hanaas Projekte zeigen das große Potenzial biobasierter Materialien.' },


        ],
      },
      // {
      //   topic: 'Technologie',
      //   title: 'Lorem',
      //   text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.',
      //   showExpansion: false,
      //   expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      //   expansionOnboarding: 0,
      //   expansionCards: [
      //     { title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' },
      //     { title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' },
      //     { title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' },
      //   ],
      //   cover: 'card1.jpg'
      // },
      // {
      //   topic: 'Mensch',
      //   title: 'Lorem',
      //   text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.',
      //   showExpansion: false,
      //   expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      //   expansionOnboarding: 0,
      //   expansionCards: [
      //     { title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' },
      //     { title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' },
      //     { title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' },
      //   ],
      //   cover: 'flax-matten-crop.jpg'
      // },
      // {
      //   topic: 'Natur',
      //   title: 'Lorem',
      //   text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.',
      //   showExpansion: false,
      //   expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      //   expansionOnboarding: 0,
      //   expansionCards: [
      //     { title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' },
      //     { title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' },
      //     { title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' },
      //   ],
      //   cover: 'flax-matten.jpg'
      // },
    ],
    topicStyles: {
      Natur: {
        color: 'green',
        icon: 'mdi-leaf',
      },
      Technologie: {
        color: 'cyan',
        icon: 'mdi-chip'
      },
      Mensch: {
        color: 'amber',
        icon: 'mdi-human-greeting-variant',
      }
    }
  }),
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `url(${require('../assets/rope2_wood.jpg')})`
      };
    }
  },
  methods: {
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
    },


  },
}
</script>

<style>
.timeline {
  max-width: 1000px;
  transition:
    transform 0.2s ease,
    opacity 0.1s ease;
}


.expansion {
  transition:
    transform 0.2s ease,
    opacity 0.1s ease;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  /* Ensure content stacks vertically */
  width: 100%;
  /* Force full width */
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

.card-parallax {
  width: 100%;
  transition:
    height 0.5s ease
}

.timeline-card {
  /* margin: 0px; */
  transition:
    transform 1s ease;
}

.expansion-card .v-card-text {
  padding: 1.5rem 2rem !important;
}

.expansion-card .v-card-title {
  padding: 1rem 2rem !important;
}


.timeline-card:hover {
  transform: translateY(-10px)
}

.architektur-1 {
  display: flex;
  align-items: center;
}

.uni-bilder {
  width: 100%;
  min-height: 250px;
  min-width: 200px;

  max-width: 500px
}

@media (max-width: 700px) {
  .v-card .v-card-title {
    font-size: 30px !important;
  }
}

@media (max-width: 500px) {
  .v-card .v-card-title {
    font-size: 26px !important;
  }
}

@media (max-width: 600px) {
  .architektur-1 {
    flex-direction: column !important
  }

  .architektur-3 {
    flex-direction: column !important;
  }
}

@media (max-width: 865px){
  .architektur-5{
    flex-direction: column !important
  }
  .architektur-6{
    flex-direction: column !important
  }
}

@media (max-width: 1000px) {

  .architektur-4 {
    flex-direction: column !important;

  }

}

.hanna-portrait {
  max-width: none;
  width: 100%;
}
</style>