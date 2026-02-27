import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔑 PASTE YOUR CONFIG HERE
const firebaseConfig = {
    apiKey: "AIzaSyDz-mznmheb8i42gnfmJ09Yb6ECqeKEi4Q",
    authDomain: "clinic-booking-app-a63fb.firebaseapp.com",
    projectId: "clinic-booking-app-a63fb",
    storageBucket: "clinic-booking-app-a63fb.firebasestorage.app",
    messagingSenderId: "736526817456",
    appId: "1:736526817456:web:5ff4d6041711a330108375"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);