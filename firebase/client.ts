import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcjL3BmX0kp2MvaQv2-SubfR3muBOo1u0",
  authDomain: "interviewly-62c01.firebaseapp.com",
  projectId: "interviewly-62c01",
  storageBucket: "interviewly-62c01.appspot.com",
  messagingSenderId: "249414862778",
  appId: "1:249414862778:web:586e1706e3d8299572bf83",
  measurementId: "G-GD5Q4R5Z29"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
