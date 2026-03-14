import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPLrLWOs0n6-PSQq7A_td01r4jg5xcp7k",
  authDomain: "app-phone-d354f.firebaseapp.com",
  databaseURL: "https://app-phone-d354f-default-rtdb.firebaseio.com",
  projectId: "app-phone-d354f",
  storageBucket: "app-phone-d354f.firebasestorage.app",
  messagingSenderId: "337296361426",
  appId: "1:337296361426:web:69e32bc93c9b07cdd02a0b",
  measurementId: "G-RW5WP0CPVN",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
