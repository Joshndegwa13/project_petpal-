// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

import { getFirestore } from "@firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDzwLlp3TP0L3ExGU_A9fYJgEH1R5_lbwc",
  authDomain: "petpal-db8cf.firebaseapp.com",
  projectId: "petpal-db8cf",
  storageBucket: "petpal-db8cf.appspot.com",
  messagingSenderId: "689177586935",
  appId: "1:689177586935:web:ea5cbf11463a1ad97cf7f2"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const database = getDatabase(app);

const db = getFirestore(app);

export { storage, auth, database, db};