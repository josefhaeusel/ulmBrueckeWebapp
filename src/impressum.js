import { createApp } from 'vue';
import ImpressumComponent from './components/Impressum.vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

const app = createApp(ImpressumComponent);
app.use(vuetify).mount('#impressum');