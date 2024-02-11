import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { msalPlugin } from './plugins/msalPlugin'
import 'vuetify/styles'
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fetchAndTransferAppsettings } from './helpers/appSettingsHelper'

import {
  faHouse,
  faGear,
  faAngleRight,
  faAngleLeft,
  faMoon,
  faSun,
  faMagnifyingGlass,
  faX,
} from '@fortawesome/free-solid-svg-icons'
library.add(faHouse, faGear, faAngleRight, faAngleLeft, faMoon, faSun, faMagnifyingGlass, faX)

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

const defaultTheme = localStorage.getItem('vuetifyTheme') ?? 'light'

console.log(defaultTheme + 'mode on')

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme,
    themes: {
      myCustomLightTheme,
    },
  },
})

await fetchAndTransferAppsettings()

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(createPinia())
app.use(msalPlugin)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')

// app.use(veeValidatePlugin)
// app.use(RefreshPermissionsPlugin)

// RefreshPermissionsPlugin.isReady().then(() => {
//   app.use(router)
// })

// router.isReady().then(() => {
//   // Waiting for the router to be ready prevents race conditions when returning from a loginRedirect or acquireTokenRedirect
//   app.mount('#app')
// })
