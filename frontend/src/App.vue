<template>
  <div id="app">
    <main>
      <ParallaxBackground />
      <div class="text-left mx-10 my-6">
        <h1 class="text-h4 py-2">
            Weitere Brücken geplant
        </h1>
        <p class="text-body-1 pb-2">
            Im Sommer 2023 soll im Rahmen des Projekts zunächst eine Brücke aus Flachs in Ulm errichtet werden. Ein Jahr später soll die dritte und letzte Brücke in Bergen op Zoom in den Niederlanden eröffnet werden.
        </p>
      </div>
      <SlideCards />
      <div class="text-left mx-10 my-6">
        <h1 class="text-h4 py-2">
          KI unterstützt Marktforschung         
        </h1>
        <p class="text-body-1 pb-2">
          Um neue Materialen für das Bauen der Zukunft zu finden, setzen die Forschenden auch stark auf moderne Technik. „Wir haben großes Glück, dass wir in uns in der digitalen Ära befinden und uns digitalisierte Prozesse beim Planen, Entwerfen. Vorfertigen und Bauen helfen.“ Die Digitalisierung und die Künstliche Intelligenz ermöglichen auch in der Materialforschung große Fortschritte.         </p>
      </div>

      <FooterBottom/>
      
    </main>

  </div>
</template>

<script>
import ParallaxBackground from './components/Parallax.vue'
import FooterBottom from './components/Footer.vue'
import SlideCards from './components/slideCards.vue'


export default {
  name: 'App',
  components: {
    ParallaxBackground,
    FooterBottom,
    SlideCards
  }
};

</script>


<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
header {
  background: #42b983;
  color: white;
  padding: 20px;
}

</style>