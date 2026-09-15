// Firebase SDK Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc // <-- 1. Yahan import hona zaroori hai
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCykeTm6283vfdwtNYLuALS8bi15V3C_Jw",
  authDomain: "royal-wedding-cec8d.firebaseapp.com",
  projectId: "royal-wedding-cec8d",
  storageBucket: "royal-wedding-cec8d.appspot.com",
  messagingSenderId: "346759910822",
  appId: "1:346759910822:web:a2263b4b7a0169d833ab67"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// 2. Yahan export hona zaroori hai
export { doc, getDoc, setDoc };