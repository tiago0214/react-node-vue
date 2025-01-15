import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, onSnapshot  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

import { faker } from 'https://esm.sh/@faker-js/faker';

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
const db = getFirestore(app);

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
    whenSignIn.hidden = false;
    whenSignOut.hidden = true;
    userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
  } else {
    whenSignIn.hidden = true;
    whenSignOut.hidden = false;
    userDetails.innerHTML = '';
  }
});

const createThing = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');

let thingsRef = collection(db,"things")
let q;
let unsubscribe;

onAuthStateChanged(auth, (user) => {
  if(user){
    createThing.onclick = async () => {
      await addDoc(thingsRef, {
        uid: user.uid,
        name: faker.commerce.productName(),
        weight: faker.number.int()
      });
    }

    createThing.hidden = false;

    q = query(thingsRef, where('uid','==', user.uid))

    unsubscribe = onSnapshot(q, (querySnapshot) =>{
      const items = [];

      querySnapshot.forEach((doc) => {
        items.push(`<li>${doc.data().name}</li>`)
      })

      thingsList.innerHTML = items.join('');
    })
      
  }
  else{
    createThing.hidden = true;

    unsubscribe && unsubscribe();
  }
})