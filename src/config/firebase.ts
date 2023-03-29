// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-0j6jn7xNBAr26Po7bBRoIhZZ4oIk8RE",
  authDomain: "creativecorner-48f4d.firebaseapp.com",
  projectId: "creativecorner-48f4d",
  storageBucket: "creativecorner-48f4d.appspot.com",
  messagingSenderId: "133718250695",
  appId: "1:133718250695:web:0bdfac0dea4d641462dae2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();