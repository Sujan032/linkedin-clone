import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBRbgBlA38sQi12Ho4YSi-_tc7m_EDbDN8",
  authDomain: "linkedin-clone-bce8d.firebaseapp.com",
  projectId: "linkedin-clone-bce8d",
  storageBucket: "linkedin-clone-bce8d.appspot.com",
  messagingSenderId: "400933830404",
  appId: "1:400933830404:web:3c0c7cb9dea49c0b2f1a51",
};

//This special line of codde connects everything

const firebaseApp = firebase.initializeApp(firebaseConfig);

//gets the firestore database

const db = firebaseApp.firestore();
//We want to use firebase authentication
const auth = firebase.auth();
// firebase - Storage
const storage = firebase.storage();
export { db, auth, storage };
