import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { AVPlugin } from "vue-audio-visual";
import Vue3TouchEvents from "vue3-touch-events";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

createApp(App)
  .use(AVPlugin)
  .use(vuetify)
  .use(Vue3TouchEvents)
  .mount('#app');