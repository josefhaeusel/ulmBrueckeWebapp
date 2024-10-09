<template>
  <div class="main-container mt-5 mx-5 mb-10">

    <div class="info-abstract mx-5">
      <h1 style="padding-bottom: 15px;">
        Die Smart Circular Bridge als Musikinstrument
      </h1>

      <p>
        <!-- Ist Flachs das Material der Zukunft? Die nachhaltige Smart Circular Bridge in Ulm soll weitere Erkenntnisse
        liefern. Sie hat hierfür verschiedenste Sensoren eingebaut, welche das Material und dessen Auslastung im realen
        Raum überwachen. Unser Audio-Konzept soll eine <b>spielerische Auseinandersetzung mit der Brücke und den
          Überwachungs-Sensoriken</b> bieten und ein Bewusstsein für nachhaltiges Bauen fördern. Die Audioverarbeitung
        der Sensoren basiert auf einem von <a href="https://www.klangerfinder.de/de/home.html">KLANGERFINDER</a>
        speziell für das Projekt angefertigtem Tool und wird zum einen auf den <b>vor Ort installierten Lautsprechern
          (4)</b> und via <b>Audio-Livestream über das Internet</b> wiedergegeben.<br> <br> <b>Im Nachfolgenden werden
          die einzelnen Sensoren und ihre Sonifikationen genaustens beschrieben und jeweils isoliert erlebbar:</b> -->
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. 
      </p>
    </div>

    <div class="d-flex my-6">
      <div>
        <v-window v-model="content.expansionOnboarding">
          <v-window-item v-for="(expansionCard, n) in content.expansionCards" :key="`card-${n}`" :value="n">

            <!-- untergeordnete Slides -->
            <v-card class="audio-cards my-2 mx-2" elevation="4" >
                <v-card-title class="text-h4 bg-cyan text-white" text-color="white">
                  {{ expansionCard.title }}
                </v-card-title>

                <div class="text-video mb-5">
                  <div class="untertitel-titel">
                    <v-card-subtitle style="font-size: 18px">
                      {{ expansionCard.subtitle }}
                    </v-card-subtitle>
                    <v-card-text class="textLayout" v-html="expansionCard.text">
                    </v-card-text>
                  </div>
                  <video controls loop :id="`soundVideo-${n}`" class="rounded elevation-4	">
                    <source :src="require(`../assets/${expansionCard.video}`)" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
              </div>
            </v-card>
          </v-window-item>
        </v-window>

        <v-card-actions class="justify-space-between" >
          <v-btn icon="mdi-chevron-left" variant="plain" @click="prevCard(content); stopVideo()"></v-btn>
          <v-item-group v-model="content.expansionOnboarding" class="text-center" mandatory @click=stopVideo>
            <v-item v-for="(card, i) in content.expansionCards" :key="`btn-${i}`" v-slot="{ isSelected, toggle }"
              :value="i">
              <v-btn :variant="isSelected ? 'outlined' : 'text'" icon="mdi-record" @click="toggle"></v-btn>
            </v-item>
          </v-item-group>
          <v-btn icon="mdi-chevron-right" variant="plain" @click="nextCard(content); stopVideo()"></v-btn>
        </v-card-actions>
      </div>

    </div>

    <div class="info-abstract">
      <h1 style="padding-bottom: 15px;">
        Sound-Modi und Hüpfspiel
      </h1>

        <p>
          <!-- Uhrzeitenabhängig gibt es spezielle unterschiedliche Special-Modi um alle Generationen und Interessengruppen
          der
          Stadt anzusprechen. Neben einem GameSound, welche die jüngere Gaming Kultur aufgreift, erstellten <a
            href="https://www.klangerfinder.de/de/home.html">KLANGERFINDER</a> auch eine experimentellere Atmosphäre mit
          Percussion-Instrumenten. Bei allen synthetisch erzeugten Klängen ersetzten Sie die Transienten durch
          Holzsounds,
          um
          die Natürlichkeit, welche die Brücke ausstrahlt nicht zu verlieren. -->
          
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
          clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
          consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
          diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      <!-- <v-img style="width: 50%" min-width="300px" src="../assets/brueckenbild.png"></v-img> -->

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
    content: {

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
    },

  }),
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `url(${require('../assets/rope2_wood.jpg')})`
      };
    }
  },
  methods: {

    nextCard(module) {
      console.log()
      module.expansionOnboarding = module.expansionOnboarding + 1 > module.expansionCards.length - 1
        ? 0
        : module.expansionOnboarding + 1
    },
    prevCard(module) {
      module.expansionOnboarding = module.expansionOnboarding - 1 < 0
        ? module.expansionCards.length - 1
        : module.expansionOnboarding - 1
    },

    stopVideo() {

      var n = this.content.expansionCards.length
      for (let i = 0; i <= (n - 1); i++) {
        const soundVideo = document.getElementById(`soundVideo-${i}`)
        console.log(soundVideo)
        try {
          soundVideo.pause()
          soundVideo.currentTime = 0
        } catch (error) {
          console.warn(error)
        }
      }

      // soundVideo-${videoAnzahl}.pause()
      // soundVideo=${videoAnzahl}.currentTime = 0
    },
  },
}
</script>

<style scoped>
.info-abstract {
  max-width: 1000px;
}


.untertitel-titel {
  padding-top: 20px;
}


.text-video {
  display: flex;
  flex-direction: column;
}


.audio-cards {
  max-width: 1000px
}
.audio-cards video {
  width: 100%;
  height: 100%;
  max-width: 500px;
  align-self: center;

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
  align-items: center;
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
