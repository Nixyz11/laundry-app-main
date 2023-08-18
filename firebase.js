
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoPRz9qwA68dfgA5GrYR7oE6BYx7XvxcA",
  authDomain: "rn-chat-ae755.firebaseapp.com",
  databaseURL: "https://rn-chat-ae755-default-rtdb.firebaseio.com",
  projectId: "rn-chat-ae755",
  storageBucket: "rn-chat-ae755.appspot.com",
  messagingSenderId: "496406029064",
  appId: "1:496406029064:web:67a8f4dade7a93fe7382bd"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};