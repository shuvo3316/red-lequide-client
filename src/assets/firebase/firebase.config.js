// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxqJzJ8ODToHWpIFUm3B4jg4J9py96ick",
  authDomain: "red-liquide-auth.firebaseapp.com",
  projectId: "red-liquide-auth",
  storageBucket: "red-liquide-auth.appspot.com",
  messagingSenderId: "781176226732",
  appId: "1:781176226732:web:fc294869ca68eff5d8b009"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);