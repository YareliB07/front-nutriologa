// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCkbzLKNHtJKPEQ8CmryufXcpATi551U4",
  authDomain: "nutriologa-39385.firebaseapp.com",
  projectId: "nutriologa-39385",
  storageBucket: "nutriologa-39385.appspot.com",
  messagingSenderId: "674366730279",
  appId: "1:674366730279:web:5ace3043dc048e49145e02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)