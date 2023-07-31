// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore
} from "firebase/firestore";

export default defineNuxtPlugin(nuxtApp => {
   
    // Doing something with nuxtApp
    const config = useRuntimeConfig();
    const firebaseConfig = {
        apiKey: config.public.FIREBASE_API_KEY,
        // apiKey: 'AIzaSyBCMea7Lk6im7PIlrHBX94YqmbLoHvchEo',
        authDomain: "financial-asistant.firebaseapp.com",
        projectId: "financial-asistant"
    };

    const app = initializeApp(firebaseConfig);
    // console.log('firebase app', config.public)
    const db = getFirestore (app);
    // console.log('db', db)
    nuxtApp.provide('db', db);
})  