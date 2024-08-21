// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiie3izNZuBFGMokKQsahFGIf3M6iV7Lw",
  authDomain: "cepvirtualcampus.firebaseapp.com",
  projectId: "cepvirtualcampus",
  storageBucket: "cepvirtualcampus.appspot.com",
  messagingSenderId: "905682910672",
  appId: "1:905682910672:web:7fbd1930f941fcba7b4dd5",
  measurementId: "G-HM2BT1WBW4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
