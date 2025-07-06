/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'
import '@/assets/main.css'
import '@/assets/base.css'
import {createPinia} from "pinia";

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

registerPlugins(app)
app.use(pinia)

app.mount('#app')
