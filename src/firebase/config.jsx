import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// import boards from "../components/Initial/initialData"
import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	browserSessionPersistence,
	getAuth,
} from "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyCJA8qa7ojjncJhxGzJUJNiRBaqzFRZk8o",
	authDomain: "todo-list-abd9f.firebaseapp.com",
	projectId: "todo-list-abd9f",
	storageBucket: "todo-list-abd9f.appspot.com",
	messagingSenderId: "43964479279",
	appId: "1:43964479279:web:cf0b0cb5682ab9ad2e53da",
	measurementId: "G-FNQFKYF0P5",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
auth.setPersistence(browserSessionPersistence.NONE)
const providerGoogle = new GoogleAuthProvider()
const providerFacebook = new FacebookAuthProvider()

export { db, auth, providerGoogle, providerFacebook }
