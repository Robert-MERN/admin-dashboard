// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC1CbVNJTej7-d7Gh7R60DSlh31VRem2zw",
    authDomain: "travel-agency-database.firebaseapp.com",
    projectId: "travel-agency-database",
    storageBucket: "travel-agency-database.appspot.com",
    messagingSenderId: "403317491373",
    appId: "1:403317491373:web:8c00a98874501b12406824",
    measurementId: "G-404YYVDBY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

module.exports = { app, db, auth, storage }