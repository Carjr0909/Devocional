import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXXfGtzQhZ9gGRNPfM2Ol5BSk4HznYH4o",
  authDomain: "time-with-jesus-7bd78.firebaseapp.com",
  projectId: "time-with-jesus-7bd78",
  storageBucket: "time-with-jesus-7bd78.appspot.com",
  messagingSenderId: "269527517916",
  appId: "1:269527517916:web:dfa26f97a03d227fc48219"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
