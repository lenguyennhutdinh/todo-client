import { Link } from "react-router-dom"
import Input from "./Input"
import "./index.css"
import { AuthContext } from "../Context/AuthContext"
import { FormContext } from "../Context/FormContext"
import { useContext } from "react"
import {
	validateEmail,
	validatePassword,
	validatePasswordConfirm,
} from "../validate"
import Notify from "../Notify/Notify"

const SignUp = () => {
	const {
		form,
		handleLoginWithGoogle,
		handleLoginWithFacebook,
		handleSignupWithEmail,
		alert,
		handleCloseAlert,
	} = useContext(AuthContext)

	const {
		errorMessage,
		setErrorMessage,
		handleChange,
		handleBlur,
		handleSwitchLoginSignup,
	} = useContext(FormContext)

	const handleSubmit = (e) => {
		e.preventDefault()
		setErrorMessage({
			email: validateEmail(form.email),
			password: validatePassword(form.password, 8, 16),
			passwordConfirm: validatePasswordConfirm(
				form.password,
				form.passwordConfirm
			),
		})
		handleSignupWithEmail()
	}

	return (
		<div className="atlassian-brand">
			<Notify alert={alert} handleCloseAlert={handleCloseAlert} />
			<div>
				<h1 className="title">
					<svg
						version="1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 48 48"
						enableBackground="new 0 0 48 48"
					>
						<g fill="red">
							<polygon points="17.8,18.1 10.4,25.4 6.2,21.3 4,23.5 10.4,29.9 20,20.3" />
							<polygon points="17.8,5.1 10.4,12.4 6.2,8.3 4,10.5 10.4,16.9 20,7.3" />
							<polygon points="17.8,31.1 10.4,38.4 6.2,34.3 4,36.5 10.4,42.9 20,33.3" />
						</g>
						<g fill="#0079bf">
							<rect x="24" y="22" width="20" height={"4"} />
							<rect x="24" y="9" width="20" height="4" />
							<rect x="24" y="35" width="20" height="4" />
						</g>
					</svg>
					<span>Todo</span>
				</h1>
				<section className="inner-section">
					<div className="section-wrapper quick-switch">
						<div className="layout-twothirds-center account-form">
							<h1>Đăng ký tài khoản</h1>
							<div className="login-password-container">
								<form
									onSubmit={handleSubmit}
									id="login-form"
									method="POST"
								>
									<Input
										type="text"
										name="email"
										placeholder={"Nhập email"}
										onChange={handleChange}
										value={form.email}
										errorMessage={errorMessage.email}
										onBlur={handleBlur}
									/>
									<Input
										type="password"
										name="password"
										placeholder={"Nhập mật khẩu"}
										onChange={handleChange}
										value={form.password}
										errorMessage={errorMessage.password}
										onBlur={handleBlur}
									/>
									<Input
										type="password"
										name="passwordConfirm"
										placeholder={"Nhập lại mật khẩu"}
										onChange={handleChange}
										value={form.passwordConfirm}
										errorMessage={
											errorMessage.passwordConfirm
										}
										onBlur={handleBlur}
									/>
									<input
										id="login"
										type="submit"
										className="button account-button button-green btn btn-success"
										value="Đăng ký"
									/>
								</form>
								<div className="login-methods hide-when-two-factor">
									<div className="login-oauth-container">
										<div className="login-method-separator">
											HOẶC
										</div>
										<button
											id="googleButton"
											className="google-button oauth-button"
											href=""
											onClick={handleLoginWithGoogle}
										>
											<span
												id="google-icon"
												className="icon"
											></span>
											<span
												className="label"
												data-analytics-button="loginWithGmailButton"
											>
												Tiếp tục với Google
											</span>
										</button>
										<button
											id="facebookButton"
											className="facebook-button oauth-button"
											onClick={handleLoginWithFacebook}
										>
											<span
												id="facebook-icon"
												className="icon"
											></span>
											<span
												className="label"
												data-analytics-button="loginWithGmailButton"
											>
												Tiếp tục với Facebook
											</span>
										</button>
									</div>
								</div>
							</div>

							<ul className="bottom-form-link">
								<li>
									<Link
										className="loginLink"
										to="/login"
										onClick={handleSwitchLoginSignup}
									>
										Đã có tài khoản? Đăng nhập
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default SignUp
