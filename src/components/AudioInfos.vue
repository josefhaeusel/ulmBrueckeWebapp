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

    <div class="audio-box">
      <!-- Accel. -->
      <v-card
        v-for="(module, i) in content_modules"
        :key="i"
        class="mx-1 my-10"
        :subtitle="module.subtitle">
        <template v-slot:title>
          <span class="font-weight-black">{{ module.title }}</span>
        </template>

        <div class="d-flex">
          <v-card-text class="bg-surface-light pt-4" v-html="module.text">
          </v-card-text>
          <video controls="controls" class="accel.-video" ref="parallaxVideo">
            <source :src="require(`../assets/${module.video}`)" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </v-card>


      <!-- Strain. -->
      <v-card class="mx-auto my-10" subtitle="Strain als Identifikator für die Beugung">
        <template v-slot:title>
          <span class="font-weight-black">Strain/ Beugung</span>
        </template>

        <v-card-text class="bg-surface-light pt-4">
          Des Weiteren nutzen wir die Strain-Sensoren, sprich die Beugungswerte der Brücke. Diese beeinflussen die
          Klangdichte
          der im Hintergrund erklingenden Soundscape. Hierbei handelt es sich um ein Streicher-Ensemble mit
          Tremolo-Effektierung.
        </v-card-text>
        <video controls="controls" class="strain.-video" ref="parallaxVideo">
          <source :src="require('../assets/strain_video.mp4')" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </v-card>

      <!-- Temperatur -->
      <v-card class="mx-auto my-10" subtitle="Das Wetter als Soundscape-Creator">
        <template v-slot:title>
          <span class="font-weight-black">Temperatur</span>
        </template>

        <v-card-text class="bg-surface-light pt-4">
          Der Schritt-Sonifizierung liegt eine modulare Soundscape unter. Diese basiert auf den Wetterdaten, welche auch
          durch
          die Brücke getrackt wird. Dadurch ergibt sich zu jeder Zeit eine mit der Natur im reinen passende Atmosphäre.
          Durch
          diese Grundlage ermöglichen wir es auch, mittels der Skalentheorie, ohne welche zum Beispiel Filmmusik
          undenkbar
          wäre, weitere Einfüsse auf die Stimmungen zu nehmen.
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
        Uhrzeitenabhängig gibt es spezielle unterschiedliche Special-Modi um alle Generationen und Interessengruppen der
        Stadt anzusprechen. Neben einem GameSound, welche die jüngere Gaming Kultur aufgreift, erstellten <a
          href="https://www.klangerfinder.de/de/home.html">KLANGERFINDER</a> auch eine experimentellere Atmosphäre mit
        Percussion-Instrumenten. Bei allen synthetisch erzeugten Klängen ersetzten wir die Transienten durch Holzsounds,
        um
        die Natürlichkeit, welche die Brücke ausstrahlt nicht zu verlieren.
      </p>
    </div>

  </div>
</template>
<script>

export default {
  name: "AudioInfoComponent",
  data: () => ({
    content_modules: [
      {
        title: 'Die Accelerometer',
        subtitle: 'Wie klingen Schritte?',
        text:'Durch die Accelometer-Werte können wir durch rechnerische Ableitungen einzelne Peaks/ Schritte ablesen und in Echtzeit sonifizieren. Hierbei unterscheiden wir zwischen <b> 7 verschiedenen Schrittstärken</b>, damit die Verklanglichung nie Langweilig wird. Zum Beispiel klingt auch ein Hund anders wie ein Erwachsener Mensch.',
        video: 'accel_video.mp4'
      },
      {
        title: 'Die Accelerometer',
        subtitle: 'Wie klingen Schritte?',
        text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.',
        video: 'accel_video.mp4'
      },
      
    ],
  }),
  computed: {
  },
  methods: {
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
  flex-direction: column;
  padding: 10px 100px 10px 100px;
  justify-content: space-between;
}

.audio-box .v-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px 50px 20px;

}

.audio-box video {
  width: 100%;
  /* height: 100%; */

}

.audioSpecials {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: 100px;
  margin-top: 10px;
  margin-bottom: 50px;
}

.accel.-video {
  width: 20px
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>