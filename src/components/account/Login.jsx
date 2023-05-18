const Login = () => {
	return (
        <body
			className="atlassian-brand"
			data-analytics-screen="loginChoiceScreenV2"
			data-analytics-marketing-event="true"
		>
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
							<rect x="24" y="22" width="20" height={'4'} />
							<rect x="24" y="9" width="20" height="4" />
							<rect x="24" y="35" width="20" height="4" />
						</g>
					</svg>
					<span>Todo</span>
				</h1>
				<section className="inner-section">
					<div className="section-wrapper quick-switch">
						<div className="layout-twothirds-center account-form">
							<input id="returnUrl" type="hidden" value="" />
							<input id="reauthenticate" type="hidden" value="" />
							<div id="error" className="hidden quick-switch">
								<p className="error-message"></p>
							</div>
							<h1>Đăng ký tài khoản</h1>
							<div className="login-password-container">
								<form id="login-form" method="POST">
									<div className="login-password-container-email">
										<div className="email-password">
											<div className="hide-when-two-factor">
												<input
													type="text"
													name="user"
													id="user"
													className="form-field"
													autoCorrect="off"
													spellCheck="false"
													autoCapitalize="off"
													autoFocus="autoFocus"
													placeholder="Nhập email"
													value=""
													autoComplete="username"
													inputMode="email"
												/>
											</div>
											<div className="hide-when-two-factor">
												<input
													type="password"
													name="password"
													id="password"
													className="form-field"
													autoCorrect="off"
													spellCheck="false"
													autoCapitalize="off"
													placeholder="Nhập mật khẩu"
													value=""
													inputMode="password"
												/>
											</div>
											<div className="hide-when-two-factor">
												<input
													type="password"
													name="password"
													id="password"
													className="form-field"
													autoCorrect="off"
													spellCheck="false"
													autoCapitalize="off"
													placeholder="Nhập lại mật khẩu"
													value=""
													inputMode="password"
												/>
											</div>
											<input
												id="login"
												type="submit"
												className="button account-button button-green btn btn-success"
												value="Đăng ký"
											/>
										</div>
									</div>
								</form>
								<div className="login-methods hide-when-two-factor">
									<div className="login-oauth-container">
										<div className="login-method-separator">
											HOẶC
										</div>
										<a
											id="googleButton"
											className="google-button oauth-button"
											href=""
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
										</a>
										<a
											id="facebookButton"
											className="facebook-button oauth-button"
											href=""
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
										</a>
									</div>
								</div>
							</div>

							<ul className="bottom-form-link">
								<li>
									<a
										className="loginLink"
										href="/login"
										data-analytics-link="loginLink"
									>
										Đã có tài khoản? Đăng nhập
									</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</div>
		</body>
    );
}

export default Login
