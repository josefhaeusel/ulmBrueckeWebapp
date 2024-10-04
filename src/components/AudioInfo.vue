<template>
  <div class="main-container">

    <div class="audio-abstract">
      <h1 style="padding-bottom: 15px;">
        Die Smart Circular Bridge als Musikinstrument
      </h1>

      <p style="text-align: center;">
        Ist Flachs das Material der Zukunft? Die nachhaltige Smart Circular Bridge in Ulm soll weitere Erkenntnisse
        liefern. Sie hat hierfür verschiedenste Sensoren eingebaut, welche das Material und dessen Auslastung im realen
        Raum überwachen. Unser Audio-Konzept soll eine <b>spielerische Auseinandersetzung mit der Brücke und den
          Überwachungs-Sensoriken</b> bieten und ein Bewusstsein für nachhaltiges Bauen fördern. Die Audioverarbeitung
        der Sensoren basiert auf einem von <a href="https://www.klangerfinder.de/de/home.html">KLANGERFINDER</a>
        speziell für das Projekt angefertigtem Tool und wird zum einen auf den <b>vor Ort installierten Lautsprechern
          (4)</b> und via <b>Audio-Livestream über das Internet</b> wiedergegeben.<br> <br> <b>Im Nachfolgenden werden
          die einzelnen Sensoren und ihre Sonifikationen genaustens beschrieben und jeweils isoliert erlebbar:</b>
      </p>
    </div>

    <div class="expansion-container d-flex mx-5 my-6">

      <div v-for="(module, i) in content_modules" :key="i"
        class="expansion">
   
        <div>
          <v-window v-model="module.expansionOnboarding">
            <v-window-item v-for="(expansionCard, n) in module.expansionCards" :key="`card-${n}`" :value="n">

              <!-- Das sind die untergeordneten Slides -->
              <v-card class="audioinfo-boxes" elevation="4" style="max-width: 1000px">
                <div class="Sensor-Boxes">
                  <v-card-title :class="['text-h4', `bg-${getStyle(module.topic).color}`, 'text-white']"
                    text-color="white">
                    {{ expansionCard.title }}
                  </v-card-title>

                  <v-card-subtitle :class="[`bg-${getStyle(module.topic).color}`, 'text-white']" text-color="white">
                    {{ expansionCard.subtitle }}
                  </v-card-subtitle>

                  <div class="text-video">
                    <v-card-text class="textLayout" v-html="expansionCard.text">
                    </v-card-text>
                    <video controls="controls" loop class="videobox" ref="parallaxVideo">
                      <source :src="require(`../assets/${expansionCard.video}`)" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                  </div>
                </div>
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
    </div>

    <div class="audioSpecials">
      <h1 style="padding-bottom: 15px;">
        Ein Hüpfspiel für wirklich jede und jeden! Um 12, 15 und 18 Uhr
      </h1>

    <div></div>
      <div class="hüpfspiel-div">
      <p style="text-align: center; padding-bottom: 30px;">
        Uhrzeitenabhängig gibt es spezielle unterschiedliche Special-Modi um alle Generationen und Interessengruppen der
        Stadt anzusprechen. Neben einem GameSound, welche die jüngere Gaming Kultur aufgreift, erstellten <a
          href="https://www.klangerfinder.de/de/home.html">KLANGERFINDER</a> auch eine experimentellere Atmosphäre mit
        Percussion-Instrumenten. Bei allen synthetisch erzeugten Klängen ersetzten Sie die Transienten durch Holzsounds,
        um
        die Natürlichkeit, welche die Brücke ausstrahlt nicht zu verlieren.
      </p>
        <v-img
        style="width: 50%"
        min-width="300px"
        src="../assets/brueckenbild.png"
        ></v-img>
      </div>
    </div>


  </div>
</template>
<script>

export default {
  name: "AudioInfoComponent",
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
        topic: 'Accelerometer',
        title: 'Informationen zu den Sensoren-Sonifikationen',
        text: 'Im Nachfolgenden können Sie durch die einzelnen Sensoren klicken und diese mit ihrer Verklanglichung auch isoliert erleben!',
        expansionContent: "???",
        expansionOnboarding: 0,
        expansionCards: [
          {
            title: 'Accelerometer',
            subtitle: 'Wie klingen Schritte?',
            text: 'Durch die Accelometer-Werte können wir durch rechnerische Ableitungen einzelne Peaks/ Schritte ablesen und in Echtzeit sonifizieren. Hierbei unterscheiden wir zwischen <b> 7 verschiedenen Schrittstärken</b>, damit die Verklanglichung nie Langweilig wird. Zum Beispiel klingt auch ein Hund anders wie ein Erwachsener Mensch.',
            video: 'accel_video.mp4',
          },
          {
            title: 'Strain',
            subtitle: 'Strain als Identifikator für die Beugung',
            text: 'Des Weiteren nutzen wir die Strain-Sensoren, sprich die Beugungswerte der Brücke. Diese beeinflussen die Klangdichte der im Hintergrund erklingenden Soundscape. Hierbei handelt es sich um ein Streicher-Ensemble mit Tremolo-Effektierung.',
            video: 'strain_video.mp4',
          },
          {
            title: 'Temperatur',
            subtitle: 'Das Wetter als Soundscape-Creator',
            text: 'Der Schritt-Sonifizierung liegt eine modulare Soundscape unter. Diese basiert auf den Wetterdaten, welche auch durch die Brücke getrackt wird. Dadurch ergibt sich zu jeder Zeit eine mit der Natur im reinen passende Atmosphäre. Durch diese Grundlage ermöglichen wir es auch, mittels der Skalentheorie, ohne welche zum Beispiel Filmmusik undenkbar wäre, weitere Einfüsse auf die Stimmungen zu nehmen.',
            video: 'temperatur_video.mp4'
          },
        ],
        cover: 'flax-matten.jpg'
      },
    ],
    topicStyles: {
      Accelerometer: {
        color: 'grey',
      },
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

<style scoped>
.audio-abstract {
  display: flex;
      flex-direction: column;
      align-items: center;
      margin-inline: 120px;
      margin-top: 30px;
      margin-bottom: 10px;
}

.Sensor-Boxes {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px 50px 20px;
}

.text-video {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}


.textLayout {
      font-size: 1.2rem !important
    }


.Sensor-Boxes video {
  max-width: 60%;
  height: 100%;

}

.audioSpecials {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: 100px;
  margin-top: 10px;
  margin-bottom: 50px;
}

.hüpfspiel-div {
  display: flex;
  flex-direction: column;
  padding-inline: 400px;
  align-items:  center;
}


.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
