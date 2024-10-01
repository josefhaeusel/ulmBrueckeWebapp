import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';
import { AVPlugin } from "vue-audio-visual";



const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Material Design Icons
  },

})



createApp(App).use(AVPlugin).use(vuetify).mount('#app')

