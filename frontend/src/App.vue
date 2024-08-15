<template>
  <div id="app">
    <main>
      <ParallaxBackground />
      <ContentMiddle />
      <FooterBottom/>
    </main>

  </div>
</template>

<script>
import ParallaxBackground from './components/Parallax.vue';
import FooterBottom from './components/Footer.vue'
import ContentMiddle from './components/Content.vue'

export default {
  name: 'App',
  components: {
    ParallaxBackground,
    ContentMiddle,
    FooterBottom
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