
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Agrega el SDK de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAlaOmsA8oKgPt75HHBGrtkFjf6qcBmqmE",
    authDomain: "react-journal-app-6a957.firebaseapp.com",
    projectId: "react-journal-app-6a957",
    storageBucket: "react-journal-app-6a957.appspot.com",
    messagingSenderId: "261833224759",
    appId: "1:261833224759:web:999b5f0ae607708545c5b2"
};

// Inicializar Firebase SDK
firebase.initializeApp( firebaseConfig );

// Configuracion de la Base de Datos en Firebase
const db = firebase.firestore();

// Configuracion de Google para Auth
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Exportacion
export { db, googleAuthProvider, firebase }
