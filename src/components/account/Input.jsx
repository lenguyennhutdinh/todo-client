const Input = ({ type, name, placeholder, value, errorMessage, onChange, onBlur }) => {
	return (
		<div>
			<input
				type={type}
				name={name}
				id={name}
				className="form-field"
				placeholder={placeholder}
				value={value}
				inputMode={name}
				onChange={onChange}
				onBlur={onBlur}
				autoComplete="off"
			/>
			<div className="error-message">{errorMessage}</div>
		</div>
	)
}

export default Input
