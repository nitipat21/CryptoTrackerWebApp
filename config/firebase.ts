import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, doc } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAtxs_mE9ZP-hwbpq2YY3jy75QOcvrNI58",
    authDomain: "cryptotrackerwebapp.firebaseapp.com",
    projectId: "cryptotrackerwebapp",
    storageBucket: "cryptotrackerwebapp.appspot.com",
    messagingSenderId: "912887911450",
    appId: "1:912887911450:web:4a49000d166bf940ce6da3",
    measurementId: "G-SRNFC7M730"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);

export const usersCollectionRef = collection(db, "users");