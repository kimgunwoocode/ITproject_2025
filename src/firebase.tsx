// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaqteAnnJ0Kd724ktWBw9cV7MW0jSY3QM",
  authDomain: "whattodo-9399d.firebaseapp.com",
  databaseURL: "https://whattodo-9399d-default-rtdb.firebaseio.com",
  projectId: "whattodo-9399d",
  storageBucket: "whattodo-9399d.firebasestorage.app",
  messagingSenderId: "454829557252",
  appId: "1:454829557252:web:304773e722697e36035751",
  measurementId: "G-PJK1PZ0XB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);