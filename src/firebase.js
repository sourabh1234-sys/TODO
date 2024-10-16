import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyDw5erVnXAAuJCnnEkjAfMsmowHhUpfmXk",
  authDomain: "app-todo-3df2e.firebaseapp.com",
  projectId: "app-todo-3df2e",
  storageBucket: "app-todo-3df2e.appspot.com",
  messagingSenderId: "619614577078",
  appId: "1:619614577078:web:4a3cd3a193e3c7c404a117",
  measurementId: "G-9PL16G12NM"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
