import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB_Yace1aMcq-92XX8BZPqat0E2A8G_8MU",
    authDomain: "react-blog-1be9d.firebaseapp.com",
    projectId: "react-blog-1be9d",
    storageBucket: "react-blog-1be9d.appspot.com",
    messagingSenderId: "451827118035",
    appId: "1:451827118035:web:42d64cd2d0a021a1868926"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage };


