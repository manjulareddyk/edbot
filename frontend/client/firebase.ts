import {getApp, getApps, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEYbAyIYCzj77TDYpNK3C_PAq6RIPsoDg",
  authDomain: "edbot-f7907.firebaseapp.com",
  projectId: "edbot-f7907",
  storageBucket: "edbot-f7907.appspot.com",
  messagingSenderId: "888023882785",
  appId: "1:888023882785:web:dc6acb5106e451c23ed760",
  measurementId: "G-V9TMNS06LM"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};