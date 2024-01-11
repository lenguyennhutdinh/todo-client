import { Link } from "react-router-dom"
import Input from "./Input"
import "./index.css"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { FormContext } from "../Context/FormContext"
import { validateEmail, validatePassword } from "../validate"
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Login = () => {
	const {
		form,
		setForm,
		handleLoginWithGoogle,
		handleLoginWithFacebook,
		handleLoginWithEmail,
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
		})
		handleLoginWithEmail()
	}

	return (
		<div className="atlassian-brand">
			<div>
				<h1 className="title">
					<FontAwesomeIcon
						icon={faCheckDouble}
						style={{ color: "#0777e8" }}
					/>
					<span>Todo</span>
				</h1>
				<section className="inner-section">
					<div className="section-wrapper quick-switch">
						<div className="layout-twothirds-center account-form">
							<h1>Login</h1>
							<div className="login-password-container">
								<form
									onSubmit={handleSubmit}
									id="login-form"
									method="POST"
								>
									<Input
										type="text"
										name="email"
										placeholder={"Enter your email..."}
										onChange={handleChange}
										value={form.email}
										errorMessage={errorMessage.email}
										onBlur={handleBlur}
									/>
									<Input
										type="password"
										name="password"
										placeholder={"Enter your password..."}
										onChange={handleChange}
										value={form.password}
										errorMessage={errorMessage.password}
										onBlur={handleBlur}
									/>
									<input
										id="login"
										type="submit"
										className="button account-button button-green btn btn-success"
										value="Login"
									/>
								</form>
								<div className="login-methods hide-when-two-factor">
									<div className="login-oauth-container">
										<div className="login-method-separator">
											Or
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
											<span className="label">
												Continue with Google
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
											<span className="label">
												Continue with Facebook
											</span>
										</button>
									</div>
								</div>
							</div>

							<ul className="bottom-form-link">
								<li>
									<Link
										className="signupLink"
										to="/signup"
										onClick={handleSwitchLoginSignup}
									>
										Don't have an account yet? Register
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

export default Login
