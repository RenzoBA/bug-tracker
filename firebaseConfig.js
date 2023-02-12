import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "bug-tracker-f44ac.firebaseapp.com",
  projectId: "bug-tracker-f44ac",
  storageBucket: "bug-tracker-f44ac.appspot.com",
  messagingSenderId: "987721139042",
  appId: "1:987721139042:web:945303d453955267ca223b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
