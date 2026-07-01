
import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "ascendraai.firebaseapp.com",
  projectId: "ascendraai",
  storageBucket: "ascendraai.firebasestorage.app",
  messagingSenderId: "514147416948",
  appId: "1:514147416948:web:c82ced3d2b0e5c1a5c8a21"
};


const app = initializeApp(firebaseConfig);

const auth=getAuth(app);

const provider= new GoogleAuthProvider();

export {auth,provider};