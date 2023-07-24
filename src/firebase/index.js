import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuCNFOq9RPGRleM5qmbfIGYFWCJV2R9To",
  authDomain: "kanban-board-e6e95.firebaseapp.com",
  projectId: "kanban-board-e6e95",
  storageBucket: "kanban-board-e6e95.appspot.com",
  messagingSenderId: "979970499753",
  appId: "1:979970499753:web:b154f3a70c52cf5f3675b8",
  measurementId: "G-N0PPK0X6YB"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth }