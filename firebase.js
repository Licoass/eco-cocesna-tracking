/**
 * ==========================================================
 * firebase.js
 * Configuración e inicialización de Firebase
 * Eco Ingeniería - Seguimiento de Gabinetes
 * ==========================================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    enableIndexedDbPersistence
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/**
 * ==========================================================
 * CONFIGURACIÓN FIREBASE
 * ==========================================================
 */

const firebaseConfig = {

    apiKey: "AIzaSyDKCwBKPlSVeXbF4HCwOaUJReG7Jh6i_pI",

    authDomain: "eco-cocesna-tracking.firebaseapp.com",

    projectId: "eco-cocesna-tracking",

    storageBucket: "eco-cocesna-tracking.firebasestorage.app",

    messagingSenderId: "748892574140",

    appId: "1:748892574140:web:16ce20b94f7eaaefde1bb9"

};

/**
 * ==========================================================
 * INICIALIZAR FIREBASE
 * ==========================================================
 */

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

/**
 * ==========================================================
 * ACTIVAR CACHE OFFLINE
 * ==========================================================
 */

enableIndexedDbPersistence(db)
.catch((err)=>{

    switch(err.code){

        case "failed-precondition":

            console.warn(
                "La persistencia no pudo activarse porque existen varias pestañas abiertas."
            );

        break;

        case "unimplemented":

            console.warn(
                "El navegador no soporta persistencia offline."
            );

        break;

        default:

            console.warn(err);

    }

});

/**
 * ==========================================================
 * EXPORTAR BASE DE DATOS
 * ==========================================================
 */

export { db };