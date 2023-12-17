import React, { useState, useContext, useEffect } from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../../queries";
import { AuthContext } from "../../context/authContext";
import Alert from "@mui/material/Alert";


const Login = () => {


	const useGoogleLoginHandler = () => {
		const authContext = useContext(AuthContext);
	
		const handleGoogleSuccess = async (response) => {
			try {
				const res = await fetch("http://localhost:3001/api/auth/google", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ code: response.code }),
				});
	
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Failed to authenticate");
				}
	
				// Store the token in local storage and update the context
				localStorage.setItem("token", data.token);
				authContext.register(data.user); // Use register
			} catch (error) {
				console.error("Error during Google Login:", error);
			}
		};
	
		return handleGoogleSuccess;
	};
	
	const handleGoogleLogin = useGoogleLoginHandler();
	
	const handleGoogleFailure = (error) => {
		console.log("Login Failed:", error);
	};
	
	const clientId ="955396247779-g8ebte54c7ltemb1e5cq6ohluta47jtm.apps.googleusercontent.com";






	const context = useContext(AuthContext);
	let navigate = useNavigate();
	const [errors, setErrors] = useState();

	const [loginUser] = useMutation(LOGIN_USER, {
		update(proxy, { data: { loginUser: userData } }) {
			context.login(userData);
			navigate("/");
			console.log("login was successful");
		},
		onError(err) {
			console.log("there was an error registering the user");
			console.log(err.graphQLErrors[0].message);
			setErrors(err.graphQLErrors[0].message);
		},
	});

	const [values, setValues] = useState({ email: "", password: "" }); // Holds the form values

	// This function updates the `values` state whenever an input changes.
	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	// This function is called when the form is submitted.
	const handleSubmit = (event) => {
		console.log("form submitted", values);
		event.preventDefault();
		loginUser({
			variables: {
				loginInput: {
					email: values.email,
					password: values.password,
				},
			},
		});
	};

	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const eyeIcon = showPassword ? faEyeSlash : faEye;

	const [rememberMe, setRememberMe] = useState(false);

	const handleCheckboxChange = () => {
		setRememberMe(!rememberMe);
	};

	const login = useGoogleLogin({
		clientId: clientId,
		ux_mode: "redirect",
		redirect_uri: "http://localhost:3001/api/auth/google",
		onSuccess: handleGoogleLogin,
		onFailure: handleGoogleFailure,
		flow: "auth-code",
	});

	return (
		<div className="page-positioner">
			<div className="auth-div">
				<div className="left-container">
					<div className="img-container">
						<img src="AiSpeaking.avif" alt=""></img>
					</div>
				</div>
				<div className="auth-form">
					<form onSubmit={handleSubmit}>
						<h1 style={{ fontWeight: "400", fontSize: "1.5rem" }}>
							Welcome to
							<strong
								style={{
									fontWeight: "700",
									fontSize: "2rem",
								}}
							>
								&nbsp;CuriosityAI
							</strong>
						</h1>
						<p style={{ marginTop: "0.5rem", color: "#333333" }}>
							Dive deep into discussions and explore the
							complexities of various subjects.
						</p>

						<div
							style={{
								height: "2.5rem",
								width: "100%",
								marginLeft: "auto",
								marginRight: "auto",
								border: " solid 1px #333333",
								marginTop: "2rem",
								borderRadius: "5px",
								backgroundColor: "White",
								color: "black",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								cursor: "pointer",
							}}
							onClick={() => login()}
						>
							<img
								style={{ width: "1.5rem", height: "1.5rem" }}
								src="google-logo.webp"
								alt="Google Logo"
							/>
							<p
								style={{
									marginLeft: "0.5rem",
									fontSize: "0.7rem",
									fontWeight: "600",
								}}
							>
								continue with google
							</p>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginTop: "2.5rem",
							}}
						>
							<div
								style={{
									width: "45%",
									border: "solid #ddd 0.2px",
								}}
							></div>
							<p
								style={{
									marginLeft: "1rem",
									marginRight: "1rem",
									fontSize: "0.7rem",
									fontWeight: "700",
								}}
							>
								OR
							</p>
							<div
								style={{
									width: "45%",
									border: "solid #ddd 0.2px",
								}}
							></div>
						</div>
						<p
							style={{
								marginTop: "2rem",
								marginBottom: "0.3rem",
								fontWeight: "500",
							}}
						>
							Email
						</p>

						<input
							style={{
								height: "2.5rem",
								width: "100%",
								marginLeft: "auto",
								marginRight: "auto",
								display: "block",
								borderColor: "#ddd",
								border: " solid 1px #333",
								borderRadius: "5px",
								textIndent: "1rem",
							}}
							placeholder="Enter your email"
							name="email"
							type="email"
							required
							onChange={handleChange}
						/>

						<p
							style={{
								marginTop: "2rem",
								marginBottom: "0.3rem",
								fontWeight: "500",
							}}
						>
							Password
						</p>

						<div
							style={{
								height: "2.5rem",
								width: "100%",
								marginLeft: "auto",
								marginRight: "auto",
								display: "flex",
								alignItems: "center",
								border: " solid 1px #333333",
								borderRadius: "5px",
							}}
						>
							<input
								style={{
									height: "2.4rem",
									width: "90%",
									display: "block",
									border: "0",
									backgroundColor: "white",
									borderRadius: "5px",
									textIndent: "1rem",
									flex: "9",
								}}
								placeholder="Enter your password"
								name="password"
								type={showPassword ? "text" : "password"}
								required
								onChange={handleChange}
							/>
							<div
								style={{ flex: "1", cursor: "pointer" }}
								onClick={togglePasswordVisibility}
							>
								<FontAwesomeIcon
									icon={eyeIcon}
									style={{
										color: "#a1a1a1",
										fontSize: "1.3rem",
									}}
								/>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								width: "fit-content",
								marginTop: "0.3rem",
							}}
						>
							<input
								type="checkbox"
								id="remember-me"
								checked={rememberMe}
								onChange={handleCheckboxChange}
								style={{
									display: "block",
									width: "1rem",
									height: "1rem",
								}}
							/>
							<label
								style={{ marginLeft: "0.5rem", color: "grey" }}
								htmlFor="remember-me"
							>
								Remember Me?
							</label>
						</div>

						{errors && (
							<Alert
								style={{
									marginTop: "1rem",
									marginBottom: "-1rem",
								}}
								severity="error"
							>
								{errors}
							</Alert>
						)}

						<button
							style={{
								height: "2.5rem",
								width: "100%",
								marginLeft: "auto",
								marginRight: "auto",
								display: "block",
								marginTop: "2rem",
								borderRadius: "5px",
								border: "0",
								backgroundColor: "black",
								color: "white",
							}}
							type="submit"
						>
							Login
						</button>
						<p
							style={{
								color: "#333333",
								marginTop: "0.3rem",
								fontSize: "0.8rem",
							}}
						>
							Dont have an account?{" "}
							<Link
								to="/signup"
								style={{ textDecoration: "none" }}
							>
								Create account
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};
export default Login;
