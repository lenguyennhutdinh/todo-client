const validateEmail = (inputText) => {
	if (inputText.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
		return ""
	return "Email is not valid!"
}

const validatePassword = (inputText, minLength, maxLength) => {
	if (inputText.length < minLength)
		return "Password must be at least 8 characters"
	else if (inputText.length > maxLength) return "Password up to 16 characters"
	else return ""
}

const validatePasswordConfirm = (password, passwordConfirm) => {
	if (password !== passwordConfirm) return "Password doesn't match"
	else return ""
}

export { validateEmail, validatePassword, validatePasswordConfirm }
