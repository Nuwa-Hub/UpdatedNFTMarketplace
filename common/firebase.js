// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBop-5thXQza_4oGaOvPbQiYQE3JzA-rFU",
  authDomain: "nft-marketplace-8fa87.firebaseapp.com",
  projectId: "nft-marketplace-8fa87",
  storageBucket: "nft-marketplace-8fa87.appspot.com",
  messagingSenderId: "359997956370",
  appId: "1:359997956370:web:d3369c11ba594f9749d3cb",
  measurementId: "G-L676SR98CK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);