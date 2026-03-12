import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD_n5ucBpbD7jxxFvHPHd9ZvDNdpXAnF2A",
  authDomain: "lora-d4040.firebaseapp.com",
  databaseURL:
    "https://lora-d4040-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lora-d4040",
  storageBucket: "lora-d4040.firebasestorage.app",
  messagingSenderId: "1023848167071",
  appId: "1:1023848167071:web:85b12177f59dd0dd47d4aa",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);