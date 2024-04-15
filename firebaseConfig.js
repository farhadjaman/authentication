
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWm5mNrNnt0Oc7dn-qm9_ldxkRAUT4DvY",
  authDomain: "cookwithfarhad.firebaseapp.com",
  projectId: "cookwithfarhad",
  storageBucket: "cookwithfarhad.appspot.com",
  messagingSenderId: "997197349421",
  appId: "1:997197349421:web:3dfde8aea36d1fc5c2eea4"
};


const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
