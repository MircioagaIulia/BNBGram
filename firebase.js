import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


/*const firebaseConfig = {
  apiKey: "AIzaSyAPPgrRUa8kMhZxpK2SMo0YjW8WweAh4OM",
  authDomain: "bnbgram-41d75.firebaseapp.com",
  projectId: "bnbgram-41d75",
  storageBucket: "bnbgram-41d75.appspot.com",
  messagingSenderId: "319597913004",
  appId: "1:319597913004:web:6c502fab1547e17f435009",
  measurementId: "G-L06RM0XG92"
};
*/

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
