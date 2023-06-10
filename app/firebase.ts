import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


import Constants from "expo-constants";

if (!Constants || !Constants.manifest || !Constants.manifest.extra) {
    throw new Error("Missing firebase config");
}

export const firebaseConfig = {
    apiKey: Constants.manifest.extra.FIREBASE_API_KEY,
    authDomain: Constants.manifest.extra.FIREBASE_AUTH_DOMAIN,
    projectId: Constants.manifest.extra.FIREBASE_PROJECT_ID,
    storageBucket: Constants.manifest.extra.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: Constants.manifest.extra.FIREBASE_MESSAGING_SENDER_ID,
    appId: Constants.manifest.extra.FIREBASE_APP_ID,
    measurementId: Constants.manifest.extra.FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp)

export { auth, firebaseApp, db, storage };

