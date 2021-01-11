// Your web app's Firebase configuration
import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyC3Y6gH3e0AfJbJcw1k8ZhnQa06ne0dWxs",
  authDomain: "whatsapp-clone-14ebe.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-14ebe.firebaseio.com",
  projectId: "whatsapp-clone-14ebe",
  storageBucket: "whatsapp-clone-14ebe.appspot.com",
  messagingSenderId: "58691053660",
  appId: "1:58691053660:web:d075b2685a1c41bac85e99",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
