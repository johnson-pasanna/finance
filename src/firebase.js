// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoyZK-QVnn38LlB8oTiWxTTvZ4O6oTyOg",
  authDomain: "finance-tracker-f7021.firebaseapp.com",
  projectId: "finance-tracker-f7021",
  storageBucket: "finance-tracker-f7021.appspot.com",
  messagingSenderId: "817030882378",
  appId: "1:817030882378:web:db8041631057a1e636b2b3",
  measurementId: "G-661V6MLFBF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc, analytics };
