import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyDguS7x6pM9o-lYwBFUl1BCzsWgvEbhBL4",

  authDomain: "my-app-1aeef.firebaseapp.com",

  projectId: "my-app-1aeef",

  storageBucket: "my-app-1aeef.firebasestorage.app",

  messagingSenderId: "1014789487676",

  appId: "1:1014789487676:web:26230a7bd366a935805739"

};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const whenSignIn = document.getElementById('whenSignIn');
const whenSignOut = document.getElementById('whenSignOut');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');

const provider = new GoogleAuthProvider();

signInBtn.onclick = () => signInWithPopup(auth, provider);  
signOutBtn.onclick = () => signOut(auth);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});