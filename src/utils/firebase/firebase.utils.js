// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6kcYUVoBmMj8z49T8th5pD52Fczultzs",
  authDomain: "commerce-5b2b8.firebaseapp.com",
  projectId: "commerce-5b2b8",
  storageBucket: "commerce-5b2b8.appspot.com",
  messagingSenderId: "339752106603",
  appId: "1:339752106603:web:74929065fe1704a5e5cf2e"
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account" 
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
