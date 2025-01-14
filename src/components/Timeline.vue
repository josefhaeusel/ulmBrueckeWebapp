<template>
  <div class="main-container mt-5 mx-5 mb-10">

    <!--div class="text-left info-abstract mx-5">
      <h1 style="padding-bottom: 15px;">
        Lorem ipsum
      </h1>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua.
      </p>
    </div-->


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

                <v-card-subtitle v-if="expansionCard.subtitle"
                  :class="[`bg-${getStyle(module.topic).color}`, 'text-white']" text-color="white">
                  {{ expansionCard.subtitle }}
                </v-card-subtitle>

                <div class="bg-white" :style="expansionCard.style" :class="expansionCard.class">

                  <div v-for="(content_block, id) in expansionCard.content_blocks" :key="id"
                    :style="content_block.parentstyle">
                    <!-- Adaptive Content -->

                    <v-card-text v-if="content_block.type === 'text'" :style="content_block.style"
                      :class="content_block.class" :elevation="content_block.elevation">
                      <p v-html="content_block.data"></p>
                    </v-card-text>

                    <!-- <img v-if="content_block.type === 'img'" :style="content_block.style" :class="content_block.class"
                      :src="content_block.data"> -->

                    <a v-if="content_block.type === 'img'" :class="`${content_block.class} progressive replace`"
                      :href="content_block.data" :style="`margin-bottom:-10px; ${content_block.style}`">
                      <img :src="content_block.data_small ? content_block.data_small : content_block.data" class="preview"
                        alt="image" />
                    </a>



                    <video v-if="content_block.type === 'video'" :src="content_block.data" controls
                      :style="content_block.style" :class="content_block.class">
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
            content_blocks: [{ type: 'img', data: require('../assets/architekt/2_Platzhalter Portrait Hanaa.png'), data_small: require('../assets/architekt/comp/2_Platzhalter Portrait Hanaa.png'), style: "max-width: 500px", class: 'hanna-portrait' },
            { type: 'text', data: 'Seit vielen Jahren entwickelt die Architektin Hanaa Dahy biobasierte Werkstoffe für das Bauen. Mit vielen Partnern aus Wissenschaft und Industrie erforscht die Architektin immer neue Anwendungen vom Möbelbau bis zur Fassade. Sie hat auch die Ulmer Brücke mitgeprägt.' },
            ]
          },
          {
            title: 'Von Hanaa stammt übrigens auch ...', class: "d-flex flex-column", content_blocks: [
              { type: 'img', data: require('../assets/architekt/3 BioMat.jpg'), data_small: require('../assets/architekt/comp/3 BioMat.jpg'), parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 700px", class: '' },
              { type: 'text', style: "max-width:700px", data: '... die Idee, so ein besonderes Geländer in Ulm einzusetzen. Die Streben des Geländers bestehen auch aus Flachsfasern. Zum Schutz sind sie mit einem speziellen biobasierten Harz ummantelt. <br><br>Diese Idee wiederum stammt…' }]
          },
          {
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: require('../assets/architekt/4 (c) FibR.jpg'), data_small: require('../assets/architekt/comp/4 (c) FibR.jpg'), parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: '... von Kollegen an der Uni in Stuttgart. Sie entwickelten ein neues Herstellungsverfahren für das Bauen mit Fasern. <br><br> Diese Idee wiederum fanden mehrere Leute spannend und gründeten ein Start-up: FibR. Das junge Unternehmen hat das Brückengeländer in Ulm hergestellt.' }]
          },
          {
            class: "d-flex align-center architektur-4", content_blocks: [
              { type: 'img', data: require('../assets/architekt/5-1 (c) ICD-ITKE-IntCDC Universität Stuttgart.jpg'), data_small: require('../assets/architekt/comp/5-1 (c) ICD-ITKE-IntCDC Universität Stuttgart.jpg'), parentstyle: "display: flex; justify-content:center", style: "", class: 'uni-bilder' },
              { type: 'text', style: "max-width:500px", data: 'Mit diesem neuen Herstellungsverfahren lassen sich Gebäude mit einer ganz eigenen Ästhetik gestalten, wie hier in Wangen auf dem Gelände der Landesgartenschau 2024.' },
              { type: 'img', data: require('../assets/architekt/5-2 (c) ICD-ITKE-IntCDC Universität Stuttgart.jpg'), parentstyle: "display: flex; justify-content:center", style: "", class: 'uni-bilder' },]
          },
          {
            title: "Material und Formensprache",
            class: "d-flex align-center architektur-5", content_blocks: [
              { type: 'img', data: require('../assets/architekt/6STACKINGCLOUD(c)unklar.jpg'), data_small: require('../assets/architekt/comp/6STACKINGCLOUD(c)unklar.jpg'), parentstyle: "display: flex; justify-content:center", style: "max-width: 500px; width: 100%" },
              { type: 'text', style: "max-width: 500px", data: 'Biobasierte Werkstoffe erlauben Designern und Architekten vielseitige Formen. <br><br> Alle Materialien, egal ob Beton, Stahl oder Holz, haben typische Eigenschaften. Diese Eigenschaften führen bei jeder Materialart zu ganz bestimmten Formen beim Bauen. So sehen Brücken aus Stahl anders aus als Brücken aus Beton. <br><br> Die Formensprache dieser Materialien wurde vor über hundert Jahren entwickelt.' },
            ]
          },
          {
            title: "Die Formensprache der Biokomposite",
            class: "d-flex align-center architektur-6", content_blocks: [
              { type: 'img', data: require('../assets/architekt/7-1 LightPRO-Shell_BioMat-itke (C) BioMat am ITKE.jpg'), data_small: require('../assets/architekt/comp/7-1 LightPRO-Shell_BioMat-itke (C) BioMat am ITKE.jpg'), parentstyle: "display: flex; justify-content:center", style: "max-width: 350px; width: 100%" },
              { type: 'text', style: "max-width: 350px", data: 'Hier ein Beispiel von Hanaa: Was aussieht wie Metall, ist in Wirklichkeit ein Werkstoff aus Pflanzenfasern und synthetischem Harz: elegant, leicht und äußerst stabil!' },
              { type: 'img', data: require('../assets/architekt/7-2 LightPRO-Shell_BioMat-itke (C) BioMat am ITKE.jpg'), data_small: require('../assets/architekt/comp/7-2 LightPRO-Shell_BioMat-itke (C) BioMat am ITKE.jpg'), parentstyle: "display: flex; justify-content:center", style: "max-width: 350px;  width: 100%" },
            ]
          },
          {
            class: "d-flex align-center flex-column", content_blocks: [
              { type: 'video', data: require('../assets/architekt/platzhalter.mp4'), parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
              { type: 'text', data: 'Hanaas Projekte zeigen das große Potenzial biobasierter Materialien.', parentstyle: "display: flex; justify-content:center", style: "max-width:700px" },
            ]
          },

        ]
      },
      {
        topic: 'Natur',
        title: 'Learning by Doing',
        text: 'test test tst test test test test',
        showExpansion: false,
        cover: 'learningByDoing/Platzhalter 1 zu 1.png',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        expansionCards: [
          {
            title: 'Prof. Aart Willem Van Vuure',
            subtitle: "Katholieke Universität Leuven, Belgien",
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: require('../assets/learningByDoing/Platzhalter 1 zu 1.png'), parentstyle: "display: flex; justify-content:center", style: `width:100%; max-width: 800px; position: static` },
              { type: 'text', data: 'Aart ist einer der führenden Experten für neue basierte Materialien in Europa. Seine Vision ist es, diese Werkstoffe weiterzuentwickeln, die leicht und hochleistungsfähig sind.' },
            ]
          },
          {
            title: 'Zerreißprobe!', class: "d-flex flex-column", content_blocks: [
              { type: 'img', data: require('../assets/learningByDoing/6_Platzhalter.png'), parentstyle: "display: flex; justify-content:center", style: `width:100%; max-width: 700px"`, class: '' },
            ]
          },
          {
            title: 'Mit seinem Team hat Aart in den Laboren der Uni unzählige Versuche durchgeführt und die Vorarbeiten zur Ulmer Brücke begleitet.',
            class: 'architektur-1',
            content_blocks: [{ type: 'text', data: 'Weiter klicken und Einblicke bekommen:' },
            ]
          },
          {
            title: "Wind und Wetter trotzen",
            class: "d-flex align-center architektur-5", content_blocks: [
              { type: 'img', data: require('../assets/learningByDoing/6_Platzhalter.png'), parentstyle: "display: flex; justify-content: center", style: `max-width: 500px; width: 100%` },
            ]
          },
          {
            title: "Materialproben werden auf den Millimeter genau untersucht",
            class: "d-flex justify-center", content_blocks: [
              { type: 'img', data: require('../assets/learningByDoing/6_Platzhalter.png'), parentstyle: "display: flex; justify-content:center", style: `max-width: 500px; width: 100%` },
            ]
          },
          {
            title: 'Um Aarts Vision von neuen, leistungsfähigen Werkstoffen zu verwirklichen, braucht es Ideen, Ausdauer, Glück und sehr viele Material-Untersuchungen.',
            class: 'architektur-1',
            content_blocks: [
            ]
          },
          {
            title: 'Wouter Claassen',
            subtitle: "Technische Universität Eindhoven, Niederlande",
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: require('../assets/learningByDoing/Platzhalter 1 zu 1.png'), style: `margin-bottom: -10px; width:100%; max-width: 500px; position: static`, },
            { type: 'text', data: 'Wouter, der Konstrukteur der Ulmer Brücke, ging mit seinem Team die nächsten Schritte. Er macht die Tests an den großen Bauteilen der Brücke.' },
            ]
          },
          {
            title: 'Bei den Tests geht es rau zu: Wie viel hält ein tragender Balken aus? Wann bricht er?',
            class: 'architektur-1 justify-center d-flex',
            content_blocks: [{ type: 'img', data: require('../assets/learningByDoing/9_Platzhalter_Belastungstest Balken (c) SCB.jpg'), style: `margin-bottom: -10px; width:100%; max-width: 500px; position: static`, class: 'aart-portrait' },
            ]
          },
          {
            title: 'Die Brücke als Wegbereiter',
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: '"Die Brücke als Wegbereiter „Durch all diese Tests über viele Jahre hinweg lernen wir das Material immer besser kennen. Wir können das Verhalten vorhersagen und entwickeln mathematische Modelle. Mit den Modellen können wir Ingenieure zum Beispiel das Tragverhalten der Brücke in Ulm berechnen. Damit leistet die Brücke einen Beitrag für zukünftige Projekte im Sinne von Klimaschutz und Kreislaufwirtschaft." <br> <br> Wouter Claassen, Universität Eindhoven ' },
            ]
          },
          {
            title: 'Das Ergebnis: Die Ulmer Brücke glänzt beim Belastungstest!',
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: require('../assets/learningByDoing/11_Belastungstest.jpg'), style: `margin-bottom: -10px; width:100%; max-width: 900px; position: static`, class: 'aart-portrait' },
            { type: 'text', data: '24 Tonnen (bzw. 320 Menschen) hält sie aus - und erfüllt damit die Anforderungen an Fahrrad- und Fußgängerbrücken in Europa. Und noch mehr: Sie ist weltweit die erste Brücke dieser Art, die auch Fahrzeuge der Stadtverwaltung überqueren können.' },
            ]
          },

        ],
      },
      {
        topic: 'Mensch',
        title: 'Brückenbau',
        text: '...',
        showExpansion: false,
        cover: 'learningByDoing/Platzhalter 1 zu 1.png',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        expansionCards: [
          {
            title: 'Wie wurde die Brücke gebaut?',
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: require('../assets/learningByDoing/Platzhalter 1 zu 1.png'), style: `margin-bottom: -10px; width:100%; max-width: 500px; position: static` },
            { type: 'text', data: 'a + b +c ... + z = Brücke' },
            ]
          },
          {
            title: 'Schritt für Schritt und Bauteil für Bauteil', class: "d-flex flex-column", content_blocks: [
              { type: 'video', data: require('../assets/brueckenbau/2_Bridge Hanging.mp4'), parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
            ]
          },
          {
            title: "Von der Produktionshalle geht's mit dem Schwertransport nach Ulm./ Der fertige Brückenkörper wird dann transportiert und platziert.",
            class: "d-flex align-center architektur-5 justify-center", content_blocks: [
              { type: 'video', data: require('../assets/brueckenbau/2_Bridge Hanging.mp4'), parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
            ]
          },
          {
            title: "Jetzt noch das Geländer dran.",
            class: "d-flex align-center architektur-6", content_blocks: [
              { type: 'img', data: require('../assets/brueckenbau/3_Geleander_aussen.png'), parentstyle: "display: flex; justify-content:center", style: "max-width: 550px; width: 100%" },
            ]
          },
          {
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: require('../assets/brueckenbau/4_Geleander innen.png'), parentstyle: "display: flex; justify-content:center", style: "max-width: 550px; width: 100%" },
            ]
          },
          {
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: require('../assets/brueckenbau/5_Geleander innen closeup.png'), parentstyle: "display: flex; justify-content:center", style: "max-width: 550px; width: 100%" },
            ]
          },
          {
            title: 'Und fertig!',
            class: 'architektur-1 justify-center',
            content_blocks: [{ type: 'img', data: require('../assets/brueckenbau/3_Geleander_aussen.png'), parentstyle: "display: flex; justify-content:center", style: "max-width: 550px; width: 100%" },
            ]
          },

        ],
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
    getStyle(topic) {
      return this.topicStyles[topic]
    },
    slideEffect() {

    },
    async showExpansions(module) {

      window.scrollTo({
        top: 500,
        left: 0,
        behavior: "smooth",
      });

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

      const position = this.getPosition(module)
      window.scrollTo({
        top: position || 0,
        left: 0,
        behavior: "smooth",
      });

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
    getPosition(module){
      for (let x=0; x<=this.content_modules.length; x++){
        const isModule = module == this.content_modules[x]
        if (isModule) {
          const position = 500 + (x*500)
          return position
        }
      }
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

.expansion-card .v-card-subtitle {
  padding: 0.25rem 2rem !important;
}


.timeline-card:hover {
  transform: translateY(-10px)
}

.architektur-1 {
  display: flex;
  align-items: center;
}

.learning-1 {
  max-width: 500px !important
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

@media (max-width: 865px) {
  .architektur-5 {
    flex-direction: column !important
  }

  .architektur-6 {
    flex-direction: column !important
  }
}

@media (max-width: 1000px) {

  .architektur-4 {
    flex-direction: column !important;

  }

}
</style>
