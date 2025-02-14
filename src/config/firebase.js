// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// import {getFireStore} from 'firebase/firestore'
import {getFunctions, httpsCallable, connectFunctionsEmulator} from 'firebase/functions'

const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const functions = getFunctions(app, "europe-north1");

// Connect to local emulator
connectFunctionsEmulator(functions, "localhost", 5001);

//export const db = getFirestore(app);
export {functions, httpsCallable};

