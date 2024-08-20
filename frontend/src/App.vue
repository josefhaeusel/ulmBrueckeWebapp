<template>
  <div id="app">
    <main>
      <ParallaxBackground />
      <TimelineComponent />
      <div class="text-left mx-10 my-6">
        <h1 class="text-h4 py-2">
            Weitere Brücken geplant
        </h1>
        <p class="text-body-1 pb-2">
          Im Sommer 2023 soll im Rahmen des Projekts zunächst eine Brücke aus Flachs in Ulm errichtet werden. Ein Jahr später soll die dritte und letzte Brücke in Bergen op Zoom in den Niederlanden eröffnet werden. Dabei wollen die Forscherinnen und Forscher jeweils die bereits gewonnenen Daten und Erkenntnisse aus dem vorherigen Brückenbau berücksichtigen – und so Schritt für Schritt einen Baustoff der Zukunft entwickeln.
        </p>
      </div>
      <SlideCards />
      <div class="text-left mx-10 my-6">
        <h1 class="text-h4 py-2">
          KI unterstützt Marktforschung         
        </h1>
        <p class="text-body-1 pb-2">
          Um neue Materialen für das Bauen der Zukunft zu finden, setzen die Forschenden auch stark auf moderne Technik. „Wir haben großes Glück, dass wir in uns in der digitalen Ära befinden und uns digitalisierte Prozesse beim Planen, Entwerfen. Vorfertigen und Bauen helfen.“ Die Digitalisierung und die Künstliche Intelligenz ermöglichen auch in der Materialforschung große Fortschritte. So wird im Rahmen des Projekts die Brücke systematisch in Echtzeit überwacht. Knapp 100 Sensoren liefern Daten zum Materialverhalten im Alltag. Wie verhält sich das Bauwerk, wenn 200 Menschen zeitgleich darüber laufen? Was geschieht zu verschiedenen Jahreszeiten, bei Sturm, Hagel und Schnee? Wie verläuft der Alterungsprozess des Materials im Detail? Projektpartner haben ein Structural-Health-Monitoring-System mit optischen Glasfaser-Sensoren in der Brücke entwickelt, die Informationen über Verformungen liefern. Beschleunigungssensoren erfassen selbst feinste Schwingungen, die etwa durch Wind entstehen. Die Auswertung der Daten erfolgt mithilfe von Künstlicher Intelligenz, um Muster im Materialverhalten zu erkennen. Gleichzeitig können die Ingenieure ihre Berechnungs-und Materialmodelle mit diesen Daten verfeinern. Auf dieser Grundlage lassen sich die Konstruktionen für künftige Brücken und auch für viele weitere Bauvorhaben einfacher entwickeln.
        </p>
      </div>

      <FooterBottom/>
      
    </main>

  </div>
</template>

<script>
import ParallaxBackground from './components/Parallax.vue'
import FooterBottom from './components/Footer.vue'
import SlideCards from './components/SlideCards.vue'
import TimelineComponent from './components/Timeline.vue'


export default {
  name: 'App',
  components: {
    ParallaxBackground,
    TimelineComponent,
    FooterBottom,
    SlideCards
  }
};

</script>


<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
header {
  background: #42b983;
  color: white;
  padding: 20px;
}

</style>