import { createContext, useContext, useState } from "react"
import {
	validateEmail,
	validatePassword,
	validatePasswordConfirm,
} from "../validate"
import { AuthContext } from "./AuthContext"

export const FormContext = createContext({})

export const FormProvider = ({ children }) => {
	const { form, setForm } = useContext(AuthContext)

	const [errorMessage, setErrorMessage] = useState({
		email: "",
		password: "",
		passwordConfirm: "",
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setForm({
			...form,
			[name]: value,
		})
		setErrorMessage({
			...errorMessage,
			[name]: "",
		})
	}

	const handleBlur = (e) => {
		const { name } = e.target
		let message = ""
		if (name === "email") {
			message = validateEmail(form.email)
		} else if (name === "password") {
			message = validatePassword(form.password, 8, 16)
		} else if (name === "passwordConfirm") {
			message = validatePasswordConfirm(
				form.password,
				form.passwordConfirm
			)
		}
		setErrorMessage({
			...errorMessage,
			[name]: message,
		})
	}

	const handleSwitchLoginSignup = () => {
		setErrorMessage({
			email: "",
			password: "",
			passwordConfirm: "",
		})
	}

	return (
		<FormContext.Provider
			value={{
				errorMessage,
				setErrorMessage,
				handleChange,
				handleBlur,
				handleSwitchLoginSignup,
			}}
		>
			{children}
		</FormContext.Provider>
	)
}
