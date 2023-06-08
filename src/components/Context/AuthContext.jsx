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
					message: "Đăng nhập thành công!",
					severity: "success",
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
				message: "Đăng nhập thành công!",
				severity: "success",
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
						message: "Đăng nhập thành công!",
						severity: "success",
					})
					navigate("/")
				})
				.catch((error) => {
					if (error.code === "auth/email-already-in-use")
						setAlert({
							isAlert: !alert.isAlert,
							message: "Email đã được sử dụng!",
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
					message: "Đăng nhập thành công!",
					severity: "success",
				})
				navigate("/")
			})
			.catch((error) => {
				switch (error.code) {
					case "auth/user-not-found":
						setAlert({
							isAlert: !alert.isAlert,
							message: "Tài khoản không tồn tại",
							severity: "error",
						})
						break
					case "auth/wrong-password":
						setAlert({
							isAlert: !alert.isAlert,
							message: "Mật khẩu không chính xác",
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
