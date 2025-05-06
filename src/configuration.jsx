// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxd-dyZN-xAnBfxaDR5pZwv_sbAe_52Pc",
  authDomain: "traffictally-b0c3f.firebaseapp.com",
  databaseURL: "https://traffictally-b0c3f-default-rtdb.firebaseio.com",
  projectId: "traffictally-b0c3f",
  storageBucket: "traffictally-b0c3f.firebasestorage.app",
  messagingSenderId: "456922048713",
  appId: "1:456922048713:web:654d8d20469afcd73dc518"
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);

export default db;