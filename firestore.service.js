/**
 * ==========================================================
 * firestore.service.js
 * CRUD Firestore
 * Eco Ingeniería
 * ==========================================================
 */

import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    writeBatch,
    serverTimestamp,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";

const COLLECTION = "cabinets";

/**
 * ==========================================================
 * LISTEN REALTIME
 * ==========================================================
 */

export function listenCabinets(callback){

    const q = query(
        collection(db, COLLECTION),
        orderBy("sede")
    );

    return onSnapshot(q,(snapshot)=>{

        const cabinets=[];

        snapshot.forEach(docSnap=>{

            cabinets.push({

                id:docSnap.id,

                ...docSnap.data()

            });

        });

        callback(cabinets);

    });

}

/**
 * ==========================================================
 * OBTENER TODOS
 * ==========================================================
 */

export async function getCabinets(){

    const snapshot = await getDocs(
        collection(db,COLLECTION)
    );

    return snapshot.docs.map(doc=>({

        id:doc.id,

        ...doc.data()

    }));

}

/**
 * ==========================================================
 * OBTENER UNO
 * ==========================================================
 */

export async function getCabinet(id){

    const snapshot = await getDoc(
        doc(db,COLLECTION,id)
    );

    if(!snapshot.exists()){

        return null;

    }

    return{

        id:snapshot.id,

        ...snapshot.data()

    };

}

/**
 * ==========================================================
 * CREAR
 * ==========================================================
 */

export async function createCabinet(cabinet){

    return await addDoc(

        collection(db,COLLECTION),

        {

            sede:cabinet.sede,

            area:cabinet.area,

            capacidad:cabinet.capacidad,

            gabinete:cabinet.gabinete,

            instalado:cabinet.instalado,

            reporteUrl:cabinet.reporteUrl,

            createdAt:serverTimestamp(),

            updatedAt:serverTimestamp()

        }

    );

}

/**
 * ==========================================================
 * ACTUALIZAR
 * ==========================================================
 */

export async function updateCabinet(id,data){

    await updateDoc(

        doc(db,COLLECTION,id),

        {

            ...data,

            updatedAt:serverTimestamp()

        }

    );

}

/**
 * ==========================================================
 * CAMBIAR SOLO INSTALADO
 * ==========================================================
 */

export async function setInstalled(id,value){

    await updateDoc(

        doc(db,COLLECTION,id),

        {

            instalado:value,

            updatedAt:serverTimestamp()

        }

    );

}

/**
 * ==========================================================
 * CAMBIAR REPORTE
 * ==========================================================
 */

export async function setReport(id,url){

    await updateDoc(

        doc(db,COLLECTION,id),

        {

            reporteUrl:url,

            updatedAt:serverTimestamp()

        }

    );

}

/**
 * ==========================================================
 * ELIMINAR
 * ==========================================================
 */

export async function deleteCabinet(id){

    await deleteDoc(

        doc(db,COLLECTION,id)

    );

}

/**
 * ==========================================================
 * DUPLICAR
 * ==========================================================
 */

export async function duplicateCabinet(id){

    const cabinet = await getCabinet(id);

    if(!cabinet){

        throw new Error("No existe");

    }

    delete cabinet.id;

    cabinet.instalado=false;

    cabinet.reporteUrl="";

    cabinet.createdAt=serverTimestamp();

    cabinet.updatedAt=serverTimestamp();

    return await addDoc(

        collection(db,COLLECTION),

        cabinet

    );

}

/**
 * ==========================================================
 * IMPORTAR ARRAY COMPLETO
 * ==========================================================
 */

export async function seedDatabase(cabinets){

    const batch = writeBatch(db);

    cabinets.forEach(item=>{

        const ref = doc(
            collection(db,COLLECTION)
        );

        batch.set(ref,{

            sede:item.sede,

            area:item.area,

            capacidad:item.capacidad,

            gabinete:item.gabinete,

            instalado:item.instalado,

            reporteUrl:item.reporteUrl,

            createdAt:serverTimestamp(),

            updatedAt:serverTimestamp()

        });

    });

    await batch.commit();

}

/**
 * ==========================================================
 * BORRAR TODO
 * ==========================================================
 */

export async function clearDatabase(){

    const snapshot = await getDocs(
        collection(db,COLLECTION)
    );

    const batch = writeBatch(db);

    snapshot.forEach(item=>{

        batch.delete(item.ref);

    });

    await batch.commit();

}

/**
 * ==========================================================
 * RESPALDO JSON
 * ==========================================================
 */

export async function backupDatabase(){

    const cabinets = await getCabinets();

    return JSON.stringify(

        cabinets,

        null,

        2

    );

}

/**
 * ==========================================================
 * RESTAURAR JSON
 * ==========================================================
 */

export async function restoreDatabase(json){

    const cabinets = JSON.parse(json);

    await clearDatabase();

    await seedDatabase(cabinets);

}