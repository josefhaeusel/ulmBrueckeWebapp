<template>
  <div class="main-container mt-5 mx-5 mb-10">

    <div class="info-abstract mx-5">
      <h1 style="padding-bottom: 15px;">
        Die Smart Circular Bridge ist ein Musikinstrument
      </h1>

      <p>

        Haben Sie sich schon einmal gefragt, welchen Klang eine Brücke haben könnte? <br> Das Team des Stuttgarter
        Ateliers für auditive Kommunikation - KLANGERFINDER - hat diese Frage beantwortet. <br> Basierend auf den
        eingebauten Sensoren der nachhaltigen Brücke konnten Sie durch mathematische Berechnungen neben den Schritten
        der Passanten auch das dadurch ausübende Gewicht sowie die auf der Temperatur basierende Ausdehnung zur
        Sonifikation nutzbar machen. Hierbei entstand ein einzigartiges Klangkonzept, das die Brücke zum Leben erweckt.

        <!-- <strong>Die Sensordaten von Brücken bieten Potential zur klang-ästhetischen Verarbeitung</strong> <br>
        <strong>Aufruf zum Live-Stream, hör mal rein.</strong> <br>
        <strong>Kurybeschreibung des Systems: Wie von Sensordaten zu Sounds?</strong> <br>
        <strong>Übergang zu Karte mit Klangmodulen: Hört mal rein, wie sich die Brücke bei X anhört</strong> <br>
        <strong>Wie hört sich die Brücke an bei starkter Sonne? Danach begründung, wie jede Brücke funktioniert</strong> <br> -->
      </p>
      <p> Auf dieser Seite können Sie diese Klänge isoliert erleben und sogar interaktiv Ihre eigene auditive
        Brückensituation simulieren. Neben der klanglichen Reaktion auf die Temperatur und der davon abhängigen
        Brückenausdehnung können Sie auch hören, wie sich die Belastung in Gewicht auf die Klänge auswirkt. <br>
      </p>

      <p>
        <strong> Nichts wie los - Viel Spaß beim Erkunden des weltweit ersten interaktiven Klangkonzeptes einer
          nachhaltigen Brücke! </strong>
      </p>



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
        Sound-Modi und Hüpfspiel
      </h1>

      <p>
        Neben dem Hauptinstrument für die Schritte wurden zwei zusätzliche klangliche Modi entwickelt, die zu bestimmte5n
        Zeiten jeden Tag erlebbar sind. Zwischen <b> 15 und 16 Uhr</b> taucht die Brücke in die <b>Welt des Gamings
          ein</b>: Schritte und Bewegungen erzeugen lebendige Spielsounds, die an digitale Abenteuer erinnern.
      </p>

      <p>
        Am Abend, von <b>18 bis 19 Uhr </b>, verwandelt sich die Brücke in eine <b> Bühne für
          Percussion-Instrumente.</b> Hier können Nutzer durch ihre Bewegungen rhythmische Klänge erzeugen und
        eine dynamische Klanglandschaft gestalten. Diese zeitlich abgestimmte5n Modi laden dazu ein, die Brücke
        auf immer neue, kreative Weise zu entdecken und zu erleben.

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
                  <video controls loop :id="`soundVideo-${n}`" class="border-thin" style=" border-radius: 20px; min-width: 10px">
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
          text: 'Die Strain-Sensoren der Brücke erfassen die Spannung, die durch Belastung und Temperaturschwankungen im Material entsteht. Diese Messwerte spiegeln wider, wie stark die Brücke beansprucht wird, und werden direkt auf die Klangdichte sowie Klangfarbe der Hintergrund-Soundscape übertragen. Das akustische Ergebnis ist eine warme und stark bewegende bzw. kältere und recht konstante Komposition. Dieses Konzept verbindet technische Präzision mit künstlerischer Ausdruckskraft und macht die subtilen Veränderungen in der Brückenspannung für alle erlebbar – sowohl akustisch als auch emotional. So wird die Brücke nicht nur sichtbar, sondern auch spürbar lebendig.',
          video: 'strain_video.mp4',
        },
        {
          title: 'Belastung',
          icon: "mdi-weight",
          subtitle: 'Strain-Sensoren: Indikator für kurzzeitige Belastung',
          text: 'Mit zunehmender Belastung oder steigendem Gewicht auf der Brücke verändert sich die Soundscape: Sie wird dichter, voller und entfaltet eine stärkere emotionale Wirkung. Diese Emotionalität entsteht durch das gezielte Harmonisieren der sonst neutralen Komposition und wird durch die Anwendung der Skalentheorie verstärkt – ein Prinzip, das auch in der Filmmusik essenziell ist, um Stimmungen gezielt zu beeinflussen. Durch die Wahl spezifischer Tonleitern passt sich die Soundscape an die Belastung an. Leichte, spielerische Klänge dominieren bei geringer Spannung, während bei stärkerer Belastung kraftvolle, intensive Klangwelten entstehen. Diese musikalische Flexibilität macht die Brücke zu einem Erlebnis, das nicht nur sichtbar, sondern auch emotional spürbar ist.',
          video: 'temperatur_video.mp4',
        },
        {
          title: 'Schritte',
          icon: 'mdi-shoe-print',
          subtitle: 'Mathematik als Schlüssel zur Interpretation von Accelerometer-Daten ',
          text: 'Die Accelerometer-Sensoren der Brücke messen Bewegungen präzise und wandeln sie in Klang um. Durch mathematische Ableitungen werden einzelne Peaks – also Schritte oder Bewegungen – identifiziert und in Echtzeit sonifiziert. Dabei werden sieben verschiedene Schrittstärken unterschieden, um ein dynamisches und abwechslungsreiches Klangerlebnis zu schaffen. <br> Ein leichter, schneller Hundeschritt klingt zierlich, während der kraftvolle Schritt eines Erwachsenen eine tiefere und resonantere Klangfarbe erzeugt. Diese Vielfalt sorgt dafür, dass die Klanglandschaft stets spannend bleibt. Wenn mehrere Personen oder Lebewesen gleichzeitig über die Brücke gehen, entsteht ein harmonisches und sich ständig veränderndes Klangbild. Egal ob leichtes Trippeln, gemächliches Gehen oder kräftige Sprünge – jede Bewegung trägt dazu bei, die Brücke in ein einzigartiges, lebendiges Musikstück zu verwandeln.',
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
      console.log("yo")
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
      console.log("NEXT", module.expansionOnboarding)

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
