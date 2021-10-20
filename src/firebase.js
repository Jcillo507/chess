import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "chess-91d08.firebaseapp.com",
  projectId: "chess-91d08",
  storageBucket: "chess-91d08.appspot.com",
  messagingSenderId: "446942021366",
  appId: "1:446942021366:web:0b39a41057999f2a3c8ed7",
  measurementId: "G-XBN1WQ50HW"
};

firebase.initializeApp(firebaseConfig)
export default firebase

export const db = firebase.firestore()
export const auth = firebase.auth()
