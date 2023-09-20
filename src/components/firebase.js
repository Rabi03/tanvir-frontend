import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhauFdwPBkl0E8-cGkZWiO6F_yOb_UVfE",
  authDomain: "notice-17a67.firebaseapp.com",
  projectId: "notice-17a67",
  storageBucket: "notice-17a67.appspot.com",
  messagingSenderId: "375268884880",
  appId: "1:375268884880:web:cb8a82c71cfa32a3e8b315",
  measurementId: "G-88GNVQRB97"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
