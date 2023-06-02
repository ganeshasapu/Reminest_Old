import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCER2mhUl49XE7a-w7sjDz70qKlgTWSQtQ",
  authDomain: "reminest-4bec7.firebaseapp.com",
  projectId: "reminest-4bec7",
  storageBucket: "reminest-4bec7.appspot.com",
  messagingSenderId: "921454811246",
  appId: "1:921454811246:web:4bb969b2ee9028ebbf2e7f",
  measurementId: "G-S99XFYR337",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, firebaseApp, db };

