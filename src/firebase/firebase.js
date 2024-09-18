// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCNjSOWEQHj-3ZGuLvBFvbQB8oP2ypGOY4",
  authDomain: "petpal-71a9c.firebaseapp.com",
  projectId: "petpal-71a9c",
  storageBucket: "petpal-71a9c.appspot.com",
  messagingSenderId: "451249252053",
  appId: "1:451249252053:web:84abe17f08eeca9ae7645c"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };