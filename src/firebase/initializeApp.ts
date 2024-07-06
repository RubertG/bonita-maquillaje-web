import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBgxAZ3lm8fAsdy-HpbQdGUq70eTkwuOYA",
  authDomain: "bonita-maquillaje.firebaseapp.com",
  projectId: "bonita-maquillaje",
  storageBucket: "bonita-maquillaje.appspot.com",
  messagingSenderId: "901399052017",
  appId: "1:901399052017:web:d4a4a4e07bb7383a747350",
  measurementId: "G-VQ5X9P9397"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app) 
export const auth = getAuth()