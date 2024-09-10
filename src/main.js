// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth } from 'vuefire'
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

/* code from our Firebase console */
var firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

console.log(import.meta.mode)
// if (import.meta.env.mode === 'development') {
console.log('connecting to emulator')
const auth = getAuth()
connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
const firestore = getFirestore()
connectFirestoreEmulator(firestore, 'localhost', 8080)
// }

const app = createApp(App)
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth()
  ]
})

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.use(router)
app.use(ToastService)

app.mount('#app')
