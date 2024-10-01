<template>
  <div class="main-container">
    <!-- <div v-show="timeline.showTimeline" class="scrolling-line" :style="backgroundStyle"></div> -->

    <div class="audio-abstract">
    <h1 style="padding-bottom: 15px;">
      Die Smart Circular Bridge als Musikinstrument
    </h1>

    <p style="text-align: center;">
      Ist Flachs das Material der Zukunft? Die nachhaltige Smart Circular Bridge in Ulm soll weitere Erkenntnisse liefern. Sie hat hierfür verschiedenste Sensoren eingebaut, welche das Material und dessen Auslastung im realen Raum überwachen. Unser Audio-Konzept soll eine <b>spielerische Auseinandersetzung mit der Brücke und den Überwachungs-Sensoriken</b> bieten und ein Bewusstsein für nachhaltiges Bauen fördern. Die Audioverarbeitung der Sensoren basiert auf einem von <a href="https://www.klangerfinder.de/de/home.html">KLANGERFINDER</a> speziell für das Projekt angefertigtem Tool und wird zum einen auf den <b>vor Ort installierten Lautsprechern (4)</b> und via <b>Audio-Livestream über das Internet</b> wiedergegeben.<br> <br> <b>Im Nachfolgenden werden die einzelnen Sensoren und ihre Sonifikationen genaustens beschrieben und jeweils isoliert erlebbar:</b> 
    </p>
  </div>
   
  <div class="audio-box">
    <!-- Accel. -->
    <v-card 
      class="mx-auto my-10"
      subtitle="Wie klingen Schritte?"
    >
      <template v-slot:title>
        <span class="font-weight-black">Die Accelerometer</span>
      </template>

      <v-card-text class="bg-surface-light pt-4">
        Durch die Accelometer-Werte können wir durch rechnerische Ableitungen einzelne Peaks/ Schritte ablesen und in Echtzeit sonifizieren. Hierbei unterscheiden wir zwischen <b> 7 verschiedenen Schrittstärken</b>, damit die Verklanglichung nie Langweilig wird. Zum Beispiel klingt auch ein Hund anders wie ein Erwachsener Mensch. 
      </v-card-text>
      <video controls="controls" class="accel.-video" ref="parallaxVideo">
          <source :src="require('../assets/accel._video.mp4')" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    </v-card>    
    

     <!-- Strain. -->
     <v-card 
      class="mx-auto my-10"
      subtitle="Strain als Identifikator für die Beugung"
    >
      <template v-slot:title>
        <span class="font-weight-black">Strain/ Beugung</span>
      </template>

      <v-card-text class="bg-surface-light pt-4">
        Des Weiteren nutzen wir die Strain-Sensoren, sprich die Beugungswerte der Brücke. Diese beeinflussen die Klangdichte der im Hintergrund erklingenden Soundscape. Hierbei handelt es sich um ein Streicher-Ensemble mit Tremolo-Effektierung.
      </v-card-text>
      <video controls="controls" class="strain.-video" ref="parallaxVideo">
          <source :src="require('../assets/strain_video.mp4')" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    </v-card>    

    <!-- Temperatur -->
    <v-card 
      class="mx-auto my-10"
      subtitle="Das Wetter als Soundscape-Creator"
    >
      <template v-slot:title>
        <span class="font-weight-black">Temperatur</span>
      </template>

      <v-card-text class="bg-surface-light pt-4">
        Der Schritt-Sonifizierung liegt eine modulare Soundscape unter. Diese basiert auf den Wetterdaten, welche auch durch die Brücke getrackt wird. Dadurch ergibt sich zu jeder Zeit eine mit der Natur im reinen passende Atmosphäre. Durch diese Grundlage ermöglichen wir es auch, mittels der Skalentheorie, ohne welche zum Beispiel Filmmusik undenkbar wäre, weitere Einfüsse auf die Stimmungen zu nehmen. 
      </v-card-text>
      <video controls="controls" class="accel.-video" ref="parallaxVideo">
          <source :src="require('../assets/temperatur_video.mp4')" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    </v-card>  
  </div>

  <div class="audioSpecials">
    <h1 style="padding-bottom: 15px;">
      Ein Hüpfspiel für wirklich jede und jeden! Um 12, 15 und 18 Uhr
    </h1>

    <p style="text-align: center;">
      Uhrzeitenabhängig gibt es spezielle unterschiedliche Special-Modi um alle Generationen und Interessengruppen der Stadt anzusprechen. Neben einem GameSound, welche die jüngere Gaming Kultur aufgreift, erstellten <a href="https://www.klangerfinder.de/de/home.html">KLANGERFINDER</a> auch eine experimentellere Atmosphäre mit Percussion-Instrumenten. Bei allen synthetisch erzeugten Klängen ersetzten wir die Transienten durch Holzsounds, um die Natürlichkeit, welche die Brücke ausstrahlt nicht zu verlieren.
    </p>
  </div>
  
  
    <v-timeline class="timeline mx-5 my-6" side="end" line-inset="20"
    :style='`transform: translateX(${timeline.timelinePositionX}); display: ${timeline.timelineDisplay}; opacity: ${timeline.timelineOpacity}`'>
      <v-timeline-item
        v-for="(module, i) in content_modules"
        :key="i"
        :dot-color="getStyle(module.topic).color"
        fill-dot
        :icon="getStyle(module.topic).icon"
        icon-color="white"
      >        
        <v-card class="my-8 cursor-pointer d-flex" @click="showExpansions(module)">
          <div style="width: 100%">
            <v-card-title :class="['text-h4', `bg-${getStyle(module.topic).color}`, `text-white`]" text-color="white">
              {{ module.title }}
            </v-card-title>
            <!-- <v-card-subtitle :class="[`bg-${getStyle(module.topic).color}`, 'text-white']" text-color="white">
              {{ module.topic }}
            </v-card-subtitle> -->
            <v-card-text class="bg-white text--primary mt-4">
              <p>{{ module.text }}</p>
            </v-card-text>
          </div>

          <v-list-item
            link
            @click="showExpansions(module)"
            :class="[`bg-${getStyle(module.topic).color}-lighten-5`, 'text-white']"
          >
            <v-icon icon="mdi-chevron-right-circle" size="x-large" :color="getStyle(module.topic).color"></v-icon>
          </v-list-item>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <div class="expansion-container d-flex mx-5 my-6">

      <div 
        v-for="(module, i) in content_modules"
        :key="i"
        v-show=module.showExpansion
        :style='`transform: translateX(${timeline.expansionPositionX}); display: ${timeline.expansionDisplay}; opacity: ${timeline.expansionOpacity}`'
        class="expansion"
      >
      <v-btn prepend-icon="mdi-chevron-left-circle" @click="hideExpansion(module)" size="large" rounded="xl"
      elevation=10 class="my-3" style="z-index:100" :color="getStyle(module.topic).color" variant="tonal">
        Zurück zur Timeline
      </v-btn>
      <div>
        <v-window v-model="module.expansionOnboarding">
          <v-window-item
            v-for="(expansionCard, n) in module.expansionCards"
            :key="`card-${n}`"
            :value="n"
          >
            <v-card
              class="flex-coloumn my-5 mx-5" elevation="4" style="max-width: 1000px"
            >
              <v-card-title :class="['text-h4', `bg-${getStyle(module.topic).color}`, 'text-white']" text-color="white">
              {{ expansionCard.title }}
              </v-card-title>

              <v-card-text class="my-5 bg-white">
                <p>{{ expansionCard.text }}</p>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>

        <v-card-actions class="justify-space-between">
          <v-btn
            icon="mdi-chevron-left"
            variant="plain"
            @click="prevCard(module)"
          ></v-btn>
          <v-item-group
            v-model="module.expansionOnboarding"
            class="text-center"
            mandatory
          >
            <v-item
              v-for="(card, n) in module.expansionCards"
              :key="`btn-${n}`"
              v-slot="{ isSelected, toggle }"
              :value="n"
            >
              <v-btn
                :variant="isSelected ? 'outlined' : 'text'"
                icon="mdi-record"
                @click="toggle"
              ></v-btn>
            </v-item>
          </v-item-group>
          <v-btn
            icon="mdi-chevron-right"
            variant="plain"
            @click="nextCard(module)"
          ></v-btn>
        </v-card-actions>
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
                topic: 'Natur',
                title: 'Lorem',
                text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.',
                showExpansion: false,
                expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                expansionOnboarding: 0,
                expansionCards: [
                  {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'},
                  {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'},
                  {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'},
                ],
                cover: 'flax-matten.jpg'
            },
            {
                topic: 'Technologie',
                title: 'Lorem',
                text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.',
                showExpansion: false,
                expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                expansionOnboarding: 0,
                expansionCards: [
                  {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'},
                  {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'},
                  {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'},
                ],
                cover: 'card1.jpg'
            },
            {
                topic: 'Mensch',
                title: 'Lorem',
                text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.',
                showExpansion: false,
                expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                expansionOnboarding: 0,
                expansionCards: [
                  {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'},
                  {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'},
                  {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'},
                ],
                cover: 'flax-matten.jpg'
            },
            {
                topic: 'Natur',
                title: 'Lorem',
                text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.',
                showExpansion: false,
                expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                expansionOnboarding: 0,
                expansionCards: [
                  {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'},
                  {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'},
                  {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'},
                ],
                cover: 'flax-matten.jpg'
            },
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
        getStyle (topic) {
          return this.topicStyles[topic]
        },
        slideEffect () {
          
        },
        async showExpansions (module) {
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
        async hideExpansion (module) {

          this.timeline.expansionPositionX = '120%'
          this.timeline.expansionOpacity = '0'

          await new Promise(resolve => setTimeout(resolve, 200));
          module.showExpansion=false
          this.timeline.timelineDisplay = ''
          this.timeline.showTimeline = true
          this.timeline.timelineOpacity = '1'

          await new Promise(resolve => setTimeout(resolve, 50));
          this.timeline.timelinePositionX = '-15px'


        },
        nextCard (module) {
          module.expansionOnboarding = module.expansionOnboarding + 1 > module.expansionCards.length - 1
            ? 0
            : module.expansionOnboarding + 1
        },
        prevCard (module) {
          module.expansionOnboarding = module.expansionOnboarding - 1 < 0
            ? module.expansionCards.length - 1
            : module.expansionOnboarding - 1
        }
    },
    }
  </script>

  <style>  
  .audio-abstract {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-inline: 100px;
      margin-top: 30px;
      margin-bottom: 10px;
}

.audio-box {
      display: flex;
      align-items: top;
      flex-direction: row;
      padding: 10px 100px 10px 100px;
      justify-content:space-between;
  }

.audio-box .v-card {
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    padding: 10px 20px 50px 20px;
    
}

  .audio-box video {
    max-width: 100%;
    max-height: auto;
    
  }

  .audioSpecials {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-inline: 100px;
      margin-top: 10px;
      margin-bottom: 50px;
}

    .main-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
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