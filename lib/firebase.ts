import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "asfar-portfolio-db",
  appId: "1:68054969621:web:a8e598b913e32958ef8d1c",
  storageBucket: "asfar-portfolio-db.firebasestorage.app",
  apiKey: "AIzaSyCrhPE9mrLcK3gz1qSi0yZa4Uf9I7Z_AqE",
  authDomain: "asfar-portfolio-db.firebaseapp.com",
  messagingSenderId: "68054969621",
};

// Initialize Firebase (prevent re-initialization in dev mode)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
