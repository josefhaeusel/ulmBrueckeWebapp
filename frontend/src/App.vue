<template>
  <div id="app">
    <header>
      <h1>Live Audio Stream</h1>
    </header>
    <main>
      <AudioPlayer />
    </main>
  </div>
</template>

<script>
import AudioPlayer from './components/AudioStream.vue';

export default {
  name: 'App',
  components: {
    AudioPlayer
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
header {
  background: #42b983;
  color: white;
  padding: 20px;
}
main {
  padding: 20px;
}
</style>