<template>
  <div class="main-container mt-5 mx-5 mb-10">

    <div class="info-abstract mx-5">
      <h1 style="padding-bottom: 15px;">
        Die Smart Circular Bridge als Musikinstrument
      </h1>

      <p>
        Ist Flachs das Material der Zukunft? Die nachhaltige Smart Circular Bridge in Ulm soll weitere Erkenntnisse
        liefern. Sie hat hierfür verschiedenste Sensoren eingebaut, welche das Material und dessen Auslastung im realen
        Raum überwachen. Das von <a href="https://www.klangerfinder.de/de/home.html">KLANGERFINDER</a> entwickelte
        Audio-Konzept soll eine spielerische Auseinandersetzung mit der Brücke und den
        Überwachungs-Sensoriken bieten und ein Bewusstsein für nachhaltiges Bauen fördern. <b>Nachfolgend können Sie
          verschiedene Szenarien hören:</b>
      </p>

      <div class="fragezeichenContainer elevation-20 border-thin my-10 bg-cyan-lighten-4 ">
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
      </div>




      <div class="d-flex my-6">
        <div>
          <v-window v-model="content.expansionOnboarding">
            <v-window-item v-for="(expansionCard, n) in content.expansionCards" :key="`card-${n}`" :value="n">

              <!-- untergeordnete Slides -->
              <v-card class="audio-cards my-2 mx-2" elevation="4">
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

          <v-card-actions class="justify-space-between">
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
    </div>

    <div class="info-abstract">
      <h1 style="padding-bottom: 15px;">
        Sound-Modi und Hüpfspiel
      </h1>

      <p>

        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus est Lorem ipsum dolor sit amet.
      </p>

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
          text: 'Durch die Accelometer-Werte können wir durch rechnerische Ableitungen einzelne Peaks/ Schritte ablesen und in Echtzeit sonifizieren. Hierbei unterscheiden wir zwischen <b> 7 verschiedenen Schrittstärken</b>, damit die Verklanglichung nie langweilig wird. Zum Beispiel klingt auch ein Hund anders wie ein Erwachsener Mensch.',
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
          text: 'Der Schritt-Sonifizierung liegt eine modulare Soundscape unter. Diese basiert auf den Wetterdaten, welche auch durch die Brücke getrackt wird. Dadurch ergibt sich zu jeder Zeit eine mit der Natur im reinen passende Atmosphäre. Durch diese Grundlage ermöglichen wir es auch, mittels der Skalentheorie, ohne welche zum Beispiel Filmmusik undenkbar wäre, weitere Einflüsse auf die Stimmungen zu nehmen.',
          video: 'temperatur_video.mp4',
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
  background-color: rgba(0, 0, 0, 0.4);
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
  background-color: rgba(0, 0, 0, 0.2);
}

.untertitel-titel {
  padding-top: 20px;
}


.text-video {
  display: flex;
  flex-direction: column;
}


.audio-cards {
  max-width: 1000px;
  min-height: 700px;
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
