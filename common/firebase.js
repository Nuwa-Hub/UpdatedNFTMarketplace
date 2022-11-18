// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5Wp-YT2n2QopdgVeihCxXc2ZK41WlMBo",
  authDomain: "marketplacestore-fd5f1.firebaseapp.com",
  projectId: "marketplacestore-fd5f1",
  storageBucket: "marketplacestore-fd5f1.appspot.com",
  messagingSenderId: "577143518094",
  appId: "1:577143518094:web:2f56ea4f4f7a8d65076adf",
  measurementId: "G-7JV40G7NCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);