<template>
  <div class="main-container mt-5 mx-5 mb-10">

    <div class="info-abstract mx-5">
      <h1 style="padding-bottom: 15px;">
        Der Klang der Brücke
      </h1>

      <p>
        Haben Sie sich schon einmal gefragt, wie eine Brücke klingt? Auf der Smart Circular Bridge hören Sie ihre eigenen Schritte, und Sie können erfahren, wie die Brücke bei unterschiedlicher Belastung oder Temperatur klingt.<br><br> Möglich wird das mit Hilfe von 42 Sensoren, die in der Brücke verbaut sind.<br> Sie dienen in erster Linie der Materialforschung für das EU-Projekt „Smart Circular Bridge“. 

      </p>
      <p> Aber das Stuttgarter Atelier für auditive Kommunikation „Klangerfinder“ hat sich die Sensordaten zunutze gemacht. Mit mathematischen Berechnungen überführen die Künstler die Daten in Klänge – und laden mit ihrem Soundkonzept dazu ein, die Brücke als Musikinstrument zu erleben.<br><br> Mit dieser WebApp hören Sie nicht nur den Sound der Brücke. Sie können die unterschiedlichen Klänge auch einzeln anhören und sogar interaktiv Ihre eigene auditive Brückensituation simulieren. Entdecken Sie, wie die Brücke auf Belastung und auf Temperaturveränderungen reagiert!
 <br>
      </p>

      <p>
        <strong> Viel Spaß beim Erkunden! </strong>
      </p>

      <img class="rounded-xl" style="margin: 15px 0 ; width:100%" :src="require('../assets/klangkunst_landingpage.png')" alt="">



      <!-- <div class="fragezeichenContainer rounded-xl elevation-10 border-thin my-10" style="background-color: #97B28A;">
        <div class="titelUndSlider">
          <div class="wieklingt" style="flex-grow: 1; text-align: center;">
            <h1>
              Wie klingt...?
            </h1>
          </div>

          <div class="volumeSlider">
            <v-icon icon="mdi-volume-high"></v-icon>
            <input type="range" min="0" max="1" value="1" step="0.01" class="slider" id="myRange" @input="updateVolume">
          </div>

        </div>

        <h1>
             Bei starker Sonneneinstrahlung?
            
            </h1>

            <v-slider></v-slider>

        <div class="d-flex flex-wrap justify-space-evenly">
          <v-card color="grey-lighten-3" v-for="(beispiel, index) in klangbeispieleModules.klangbeispielInfos"
            :key="index" class="beispielContainer rounded-pill elevation-24 mx-5" :image="beispiel.vImg">
            <div>

              <v-parallax :src=beispiel.vImg scale="0.7" height="150px">
                <div class="beispielkreise">

                  <v-card-title class="text-h8">
                    {{ beispiel.title }}
                  </v-card-title>

                  <v-card-actions style="display: flex; justify-content: center; align-items: center;">
                    <v-btn style="display: flex; justify-content: center; align-items: center;" :id="'play-button-' + index" color="white" base-color="white"
                      @click="toggleAudio(index, beispiel.audio)">
                      <v-icon :size="playingIndex === index ? '56px' : '56px'">
                        {{ playingIndex === index ? 'mdi-pause' : 'mdi-play' }}
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-icon :icon="beispiel.icon"></v-icon>
                </div>
              </v-parallax>
            </div>
          </v-card>
        </div>
      </div> -->

      <InteractiveComponent ref="interactiveComponent"/>

      <div class="info-abstract mt-5">
      <h1 style="padding-bottom: 15px;">
        Sound-Modi
      </h1>

      <p>Über den Tag hinweg ändert die Brücke ihren Sound. Neben dem Hauptinstrument für Schritte wurden zwei zusätzliche klangliche Modi entwickelt. Diese sind täglich an folgenden Zeiten erlebbar:<br><br> Zwischen 15 und 16 Uhr tauchen die Passanten in die Welt des Gamings ein: Schritte und Bewegungen erzeugen lebendige Videospiel-Sounds und erinnern an digitale Abenteuer.<br><br> Zwischen 18 bis 19 Uhr verwandelt sich die Brücke in eine Bühne für Percussion-Instrumente. Hier können Passanten durch Bewegungen rhythmische Klänge erzeugen und eine dynamische Klanglandschaft gestalten.<br><br> Diese zeitlich abgestimmten Modi laden Sie ein, die Brücke auf immer neue, kreative Weise zu entdecken.
      </p>


    </div>

    <AudioSpecial />


      <div class="my-2">
        <div>
          <v-window v-model="content.expansionOnboarding" style="min-height:910px">
            <v-window-item v-for="(expansionCard, n) in content.expansionCards" :key="`card-${n}`" :value="n">

              <!-- untergeordnete Slides -->
              <v-card class="audio-cards my-2 mx-2" elevation="4">
                <v-card-title class="text-h4 text-white d-flex align-center justify-space-between" text-color="white" style="background-color: #97B28A;">
                  {{ expansionCard.title }}
                  <v-icon :icon="expansionCard.icon" size="40" class="pr-4"></v-icon>
                </v-card-title>
                <div class="text-video mb-5">
                  <div class="untertitel-titel" >
                    <v-card-text style="font-size: 18px; font-style: bold;;">
                      {{ expansionCard.subtitle }}
                    </v-card-text>
                    <v-card-text v-html="expansionCard.text">
                    </v-card-text>
                  </div>
                  <div style="margin:0 1rem; align-self: center;">
                  <video name="video" controls loop :id="`soundVideo-${n}`" class="border-thin" style=" border-radius: 20px; min-width: 10px">
                    <source :src="require(`../assets/${expansionCard.video}`)" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                </div>
              </v-card>
            </v-window-item>
          </v-window>

          <v-card-actions class="justify-space-between">
            <v-btn icon="mdi-chevron-left" variant="plain" @click="prevCard(content); stopVideo()"></v-btn>
            <v-item-group v-model="content.expansionOnboarding" class="text-center" mandatory @click=stopVideo>
              <v-item v-for="(card, i) in content.expansionCards" :key="`btn-${i}`" v-slot="{ isSelected, toggle }"
                :value="i">
                <v-btn color="#97B28A" :variant="isSelected ? 'text' : 'plain'" icon="mdi-record" @click="toggle" size="2" class="dot-button"></v-btn>
              </v-item>
            </v-item-group>
            <v-btn icon="mdi-chevron-right" variant="plain" @click="nextCard(content); stopVideo()"></v-btn>
          </v-card-actions>
        </div>
      </div>



      <div style="height:80px"></div>

    </div>



    


  </div>
</template>
<script>
import InteractiveComponent from './InteractiveComponent.vue';
import AudioSpecial from './AudioSpecial.vue';

export default {
  name: "AudioInfoComponent",
  components: {
    InteractiveComponent,
    AudioSpecial
  },
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
          title: 'Temperatur',
          icon: "mdi-white-balance-sunny",
          subtitle: 'Strain-Sensoren: Die Spannung der Brücke hörbar machen',
          text: 'Die Strain-Sensoren der Brücke erfassen die Spannung, die durch Belastung und Temperaturschwankungen im Material entsteht.<br> Die Messwerte zeigen, wie stark die Brücke beansprucht wird. Diese Werte werden direkt in die Klangdichte und Klangfarbe der Soundscapes im Hintergrund übertragen.<br><br> Das akustische Ergebnis ist bei warmem Wetter eine warme und stark bewegende Komposition, bei kaltem Wetter eine entsprechend klanglich kältere und recht konstante Komposition. Das Konzept verbindet technische Präzision mit künstlerischer Ausdruckskraft und macht subtile Änderungen in der Brückenspannung für alle erlebbar.',
          video: 'strain_video.mp4',
        },
        {
          title: 'Belastung',
          icon: "mdi-weight",
          subtitle: 'Strain-Sensoren: Indikator für kurzzeitige Belastung',
          text: 'Wird die Brücke stärker belastet, ändert sich die Klanglandschaft: Sie wird dichter, voller und entfaltet eine stärkere emotionale Wirkung.<br> Diese Emotionalität entsteht durch ein Harmonisieren der sonst neutralen Komposition und wird durch die Anwendung der Skalentheorie verstärkt. Mit diesem Prinzip beeinflusst übrigens auch die Filmmusik gezielt Stimmungen. Durch die Wahl spezifischer Tonleitern passt sich die Klanglandschaft an die Belastung an: Leichte, spielerische Klänge dominieren bei geringer Spannung. Bei stärkerer Belastung entstehen kraftvolle, intensive Klangwelten. ',
          video: 'temperatur_video.mp4',
        },
        {
          title: 'Schritte',
          icon: 'mdi-shoe-print',
          subtitle: 'Mathematik als Schlüssel zur Interpretation von Accelerometer-Daten',
          text: 'In der Brücke sind Accelerometer-Sensoren integriert, die selbst kleinste Bewegungen mit hoher Präzision erfassen.<br> Durch mathematische Ableitungen werden einzelne Peaks identifiziert – also Schritte oder Bewegungen – und in Echtzeit verklanglicht.<br><br> Um ein dynamisches und abwechslungsreiches Klangerlebnis zu schaffen, werden sieben verschiedene Schrittstärken unterschieden.<br> Ein leichter, schneller Hundeschritt klingt zierlich. Der kraftvolle Schritt eines Erwachsenen erzeugt eine tiefere und resonantere Klangfarbe.<br> Gehen mehrere Personen über die Brücke, entsteht ein harmonisches und sich ständig veränderndes Klangbild. Ob leichtes Trippeln, gemächliches Gehen oder kräftige Sprünge: Jede Bewegung trägt dazu bei, die Brücke in ein einzigartiges, lebendiges Musikstück zu verwandeln.',
          video: 'accel_video.mp4',
        },
      ],
    },
    volume: 1,
    playingIndex: null,
    currentAudio: null,
    audios: [],
    klangbeispieleModules: {
      klangbeispielInfos: [
        {
          title: 'Winter',
          bgopacity: 0.3,
          vImg: require('../assets/Winter.jpg'),
          icon: "mdi mdi-snowflake",
          audio: 'Winter.wav',
        },
        {
          title: 'Sonne',
          bgopacity: 0.3,
          vImg: require('../assets/sonne.png'),
          icon: "mdi-white-balance-sunny",
          audio: 'Sonne.wav',
        },
        {
          title: 'Hund',
          bgopacity: 0.3,
          vImg: require('../assets/hund.png'),
          icon: "mdi-dog",
          audio: 'Hund.wav',
        },
      ],
    }

  }),
  methods: {
    stopAudioChild(){
      this.$refs.interactiveComponent?.stopPlayback("weight")
      this.$refs.interactiveComponent?.stopPlayback("temperature")
    },
    changeOpacity(beispiel) {
      beispiel.bgopacity = 0.1;
    },
    nextCard(module) {
      module.expansionOnboarding = module.expansionOnboarding + 1 > module.expansionCards.length - 1
        ? 0
        : module.expansionOnboarding + 1;

    },
    prevCard(module) {
      module.expansionOnboarding = module.expansionOnboarding - 1 < 0
        ? module.expansionCards.length - 1
        : module.expansionOnboarding - 1;
    },
    stopVideo() {
      var n = this.content.expansionCards.length;
      for (let i = 0; i <= (n - 1); i++) {
        const soundVideo = document.getElementById(`soundVideo-${i}`);
        try {
          soundVideo.pause();
          soundVideo.currentTime = 0;
        } catch (error) {
          console.warn(error);
        }
      }
    },
    updateVolume(event) {
      this.volume = event.target.value;  // Den Slider-Wert speichern
      this.updateAllVolumes();  // Optional: Volumen für alle Audios aktualisieren
    },
    updateAllVolumes() {
      this.audios.forEach(audio => {
        if (audio) {
          this.fadeAudio(audio, this.volume, 50); // Anpassen des Volumens
        }
      });
    },
    fadeAudio(audio, targetVolume, duration) {
      // Funktion zum stufenlosen Anpassen des Volumens
      const startVolume = audio.volume;
      const volumeChange = targetVolume - startVolume;
      const startTime = performance.now();

      const fadeStep = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        audio.volume = Math.max(0, Math.min(1, startVolume + (volumeChange * progress)));

        if (progress < 1) {
          requestAnimationFrame(fadeStep);
        }
      };

      requestAnimationFrame(fadeStep);
    },


    toggleAudio(index, audioSrc) {
      // Wenn das aktuelle Audio bereits abgespielt wird, pausiere es
      if (this.playingIndex === index && this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.playingIndex = null;
        this.currentAudio = null;
      } else {
        // Falls ein anderes Audio spielt, pausiere es
        if (this.currentAudio) {
          this.currentAudio.pause();
          this.currentAudio.currentTime = 0;
        }

        // Neues Audio erstellen und abspielen
        this.currentAudio = new Audio(require(`../assets/${audioSrc}`));
        this.currentAudio.volume = this.volume;
        this.currentAudio.play();
        this.playingIndex = index;

        // Füge das aktuelle Audio in das `audios`-Array ein
        this.audios[index] = this.currentAudio;
      }
    }
  }
};
</script>

<style scoped>
.fragezeichenContainer {
  padding: 20px 20px 20px 20px;
  margin: 20px 7px 20px 7px;
  border-radius: 90px;
  border-color: gray;
  border-width: 1px;
}

.titelUndSlider {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-bottom: 20px;
}

.wieklingt {
  grid-column: 2 / 3;
  grid-row: 1
}

.slider::-webkit-slider-thumb {
  appearance: none;
  color: black;
}

.volumeSlider {
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 40px;
  grid-column: 3 / 3;
  grid-row: 1
}

@media screen and (max-width: 980px) {
  .volumeSlider {
    display: flex;
    justify-content: center;
    padding-left: 10px;
    padding-top: 10px;
    grid-column: 2 / 3;
    grid-row: 2
  }
}





.beispielContainer {
  margin: 10px 14px;
  box-shadow: 10px;
  transition: 0.2s;
  min-width: 190px;
}

.beispielContainer:hover {
  transform: scale(1.1);
}



.beispielkreise {
  background-color: rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  color: white;
  align-items: center;
}


.beispielkreise:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.untertitel-titel {
  padding-top: 20px;
}


.text-video {
  display: flex;
  min-width: 20px !important;
  flex-direction: column;
}


.audio-cards {
  max-width: 1000px;
  min-height: 860px;
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

.dot-button{
  margin-top: -23px
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
