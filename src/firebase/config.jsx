// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, browserSessionPersistence } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCJA8qa7ojjncJhxGzJUJNiRBaqzFRZk8o",
	authDomain: "todo-list-abd9f.firebaseapp.com",
	projectId: "todo-list-abd9f",
	storageBucket: "todo-list-abd9f.appspot.com",
	messagingSenderId: "43964479279",
	appId: "1:43964479279:web:cf0b0cb5682ab9ad2e53da",
	measurementId: "G-FNQFKYF0P5",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
getAnalytics(app)
const auth = getAuth(app)
auth.setPersistence(browserSessionPersistence.NONE);
const providerGoogle = new GoogleAuthProvider()
const providerFacebook = new FacebookAuthProvider()
export {auth, providerGoogle, providerFacebook}
