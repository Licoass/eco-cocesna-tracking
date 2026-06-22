// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Configuración Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDKCwBKPlSVeXbF4HCwOaUJReG7Jh6i_pI",
    authDomain: "eco-cocesna-tracking.firebaseapp.com",
    projectId: "eco-cocesna-tracking",
    storageBucket: "eco-cocesna-tracking.firebasestorage.app",
    messagingSenderId: "748892574140",
    appId: "1:748892574140:web:16ce20b94f7eaaefde1bb9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Hacer disponible la BD desde app.js
window.db = db;

window.firestore = {
    collection,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot
};

window.createCabinet = async function (cabinet) {
    const docRef = doc(db, "cabinets", cabinet.id);
    await setDoc(docRef, cabinet);
};

window.updateCabinet = async function (id, updatedFields) {
    const docRef = doc(db, "cabinets", id);
    await updateDoc(docRef, updatedFields);
};

window.deleteCabinet = async function (id) {
    const docRef = doc(db, "cabinets", id);
    await deleteDoc(docRef);
};
console.log("Firebase conectado correctamente");
console.log(window.db);
window.loadFirestoreData = async function () {

    const snapshot =
        await window.firestore.getDocs(
            window.firestore.collection(
                window.db,
                "cabinets"
            )
        );

    const data = [];

    snapshot.forEach(doc => {
        const docData = doc.data();
        data.push({
            firebaseId: doc.id,
            id: docData.id || doc.id,
            ...docData
        });

    });

    console.log("Documentos encontrados:", data);

    return data;
}
// Ultima actualizacion: 2026-06-22 - Integracion Firestore exitosa