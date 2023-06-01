const validateEmail = (inputText) => {
	if (inputText.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
		return ""
	return "Email không hợp lệ!"
}

const validatePassword = (inputText, minLength, maxLength) => {
	if (inputText.length < minLength) return "Mật khẩu tối thiểu 8 ký tự"
	else if (inputText.length > maxLength) return "Mật khẩu tối đa 16 ký tự"
	else return ""
}

const validatePasswordConfirm = (password, passwordConfirm) => {
	if (password !== passwordConfirm) return "Mật khẩu không khớp"
	else return ""
}

export { validateEmail, validatePassword, validatePasswordConfirm }
