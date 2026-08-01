// Import the function that creates our Vue application
import { createApp } from 'vue'

// Import Pinia so we can use global stores
import { createPinia } from 'pinia'

// Import the main App component
import App from './App.vue'

// Import the router that will handle page navigation
import router from './router'

// Import PrimeVue
import PrimeVue from 'primevue/config'

// Import PrimeVue theme
import Aura from '@primevue/themes/aura'

// Import PrimeIcons
import 'primeicons/primeicons.css'

// Import our global styles
import './styles/main.scss'

// Create the Vue app
const app = createApp(App)

// Register Pinia so every page can use the stores
app.use(createPinia())

// Register Vue Router
app.use(router)

// Register PrimeVue with the Aura theme
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

// Mount the app to the page
app.mount('#app')