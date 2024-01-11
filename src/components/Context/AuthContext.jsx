import { createContext, useState } from "react"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth"
import { auth, providerFacebook, providerGoogle } from "../../firebase/config"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [userId, setUserId] = useState(localStorage.getItem("userId"))
	const [data, setData] = useState()
	const [form, setForm] = useState({
		email: "",
		password: "",
		passwordConfirm: "",
	})
	const [alert, setAlert] = useState({
		isAlert: false,
		message: "",
		severity: "",
	})

	const handleCloseAlert = () => {
		setAlert({ ...alert, isAlert: false })
	}

	const navigate = useNavigate()

	const handleLoginWithGoogle = () => {
		signInWithPopup(auth, providerGoogle)
			.then((result) => {
				localStorage.setItem("userId", result.user.uid)
				setUserId(localStorage.getItem("userId"))
				setAlert({
					isAlert: !alert.isAlert,
					message: "Login with google account successfully!",
					severity: "success",
				})
				setForm({
					email: "",
					password: "",
					passwordConfirm: "",
				})
				navigate("/")
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const handleLoginWithFacebook = () => {
		signInWithPopup(auth, providerFacebook).then((result) => {
			localStorage.setItem("userId", result.user.uid)
			setAlert({
				isAlert: !alert.isAlert,
				message: "Login with facebook account successfully!",
				severity: "success",
			})
			setForm({
				email: "",
				password: "",
				passwordConfirm: "",
			})
			navigate("/")
		})
	}

	const handleSignupWithEmail = () => {
		if (form.password === form.passwordConfirm) {
			createUserWithEmailAndPassword(auth, form.email, form.password)
				.then((result) => {
					localStorage.setItem("userId", result.user.uid)
					setAlert({
						isAlert: !alert.isAlert,
						message: "Sign up for an account successfully!",
						severity: "success",
					})
					setForm({
						email: "",
						password: "",
						passwordConfirm: "",
					})
					navigate("/login")
				})
				.catch((error) => {
					if (error.code === "auth/email-already-in-use")
						setAlert({
							isAlert: !alert.isAlert,
							message: "Email already used!",
							severity: "error",
						})
					else console.log(error.code)
				})
		}
	}

	const handleLoginWithEmail = () => {
		signInWithEmailAndPassword(auth, form.email, form.password)
			.then((result) => {
				localStorage.setItem("userId", result.user.uid)
				setAlert({
					isAlert: !alert.isAlert,
					message: "Login successful!",
					severity: "success",
				})
				setForm({
					email: "",
					password: "",
					passwordConfirm: "",
				})
				// navigate("/")
				location.replace("http://localhost:5173")
			})
			.catch((error) => {
				switch (error.code) {
					case "auth/user-not-found":
						setAlert({
							isAlert: !alert.isAlert,
							message: "Account does not exist!",
							severity: "error",
						})
						break
					case "auth/wrong-password":
						setAlert({
							isAlert: !alert.isAlert,
							message: "Password is incorrect",
							severity: "error",
						})
						break
					default:
						console.log(error.code)
				}
			})
	}

	return (
		<AuthContext.Provider
			value={{
				userId,
				setUserId,
				navigate,
				handleLoginWithGoogle,
				handleLoginWithFacebook,
				form,
				setForm,
				handleSignupWithEmail,
				handleLoginWithEmail,
				alert,
				setAlert,
				handleCloseAlert,
				data,
				setData,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
