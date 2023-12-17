import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useGoogleLogin } from "@react-oauth/google";
import {
	faXTwitter,
	faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../../queries";
import { AuthContext } from "../../context/authContext";
import Alert from "@mui/material/Alert";

const Signup = () => {
	const useGoogleSignupHandler = () => {
		const authContext = useContext(AuthContext);

		const handleGoogleSuccess = async (response) => {
			try {
				const res = await fetch(
					"http://localhost:3001/api/auth/google",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ code: response.code }),
					}
				);

				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Failed to authenticate");
				}

				// Store the token in local storage and update the context
				localStorage.setItem("token", data.token);
				authContext.register(data.user); // Use register

			} catch (error) {
				console.error("Error during Google signup:", error);
			}
		};

		return handleGoogleSuccess;
	};

	const handleGoogleSignup = useGoogleSignupHandler();

	const context = useContext(AuthContext);
	let navigate = useNavigate();
	const [errors, setErrors] = useState();

	const [registerUser, { loading }] = useMutation(REGISTER_USER, {
		update(proxy, { data: { registerUser: userData } }) {
			context.register(userData);
			navigate("/");
			console.log("sign up was successful");
		},
		onError(err) {
			console.log("there was an error registering the user");
			setErrors(err.graphQLErrors[0].message);
		},
	});

	const [values, setValues] = useState({ name: "", email: "", password: "" }); 

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		registerUser({
			variables: {
				registerInput: {
					name: values.name,
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

	const clientId ="955396247779-g8ebte54c7ltemb1e5cq6ohluta47jtm.apps.googleusercontent.com";

	const handleGoogleFailure = (error) => {
		console.log("Login Failed:", error);
		// Handle the error appropriately
	};

	const signup = useGoogleLogin({
		clientId: clientId,
		ux_mode: "redirect",
		redirect_uri: "http://localhost:3001/api/auth/google",
		onSuccess: handleGoogleSignup,
		onFailure: handleGoogleFailure,
		flow: "auth-code",
	});

	return (
		<div className="signup-page-div">
			<div className="signup-form">
				<form onSubmit={handleSubmit}>
					<h1
						style={{
							fontWeight: "400",
							fontSize: "1.5rem",
							marginLeft: "auto",
							marginRight: "auto",
							width: "fit-content",
						}}
					>
						<strong
							style={{
								fontWeight: "700",
								fontSize: "2rem",
							}}
						>
							Signup Your Account
						</strong>
					</h1>
					<p
						style={{
							marginTop: "0.5rem",
							color: "#333333",
							marginLeft: "auto",
							marginRight: "auto",
							width: "fit-content",
						}}
					>
						Let's delve into the world of curiosity.
					</p>

					<p
						style={{
							marginTop: "2rem",
							marginBottom: "0.3rem",
							fontWeight: "500",
						}}
					>
						Name
					</p>

					<input
						style={{
							height: "2.5rem",
							width: "100%",
							marginTop: "1rem",
							marginLeft: "auto",
							marginRight: "auto",
							display: "block",
							borderColor: "#ddd",
							border: " solid 1px #333",
							borderRadius: "5px",
							textIndent: "1rem",
						}}
						placeholder="Enter your name"
						name="name"
						type="name"
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
								style={{ color: "#a1a1a1", fontSize: "1.3rem" }}
							/>
						</div>
					</div>

					{errors ? (
						<Alert
							style={{ marginTop: "1rem", marginBottom: "-1rem" }}
							severity="error"
						>
							{errors}
						</Alert>
					) : (
						<p
							style={{
								fontSize: "1rem",
								fontWeight: "400",
								color: "gray",
								marginTop: "0.3rem",
							}}
						>
							Must be 8 or more characters and contain at least 1
							number and 1 special character.
						</p>
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
							backgroundColor: "#474859",
							color: "white",
						}}
						type="submit"
					>
						Signup
					</button>
					<p
						style={{
							color: "#333333",
							marginTop: "0.3rem",
							fontSize: "0.8rem",
						}}
					>
						Already have an account?{" "}
						<Link to="/login" style={{ textDecoration: "none" }}>
							Login
						</Link>
					</p>

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
					<div className="socials-container">
						<a onClick={() => signup()}>
							<img
								style={{ width: "3rem", height: "3rem" }}
								src="google-logo.webp"
								alt="Google Logo"
							/>
						</a>

						<a href="" target="_blank" rel="noreferrer">
							<FontAwesomeIcon
								icon={faSquareFacebook}
								style={{ color: "#1877F2", fontSize: "3rem" }}
							/>
						</a>

						<div className="x-button">
							<a href="" target="_blank" rel="noreferrer">
								<FontAwesomeIcon
									icon={faXTwitter}
									style={{
										color: "fff",
										zIndex: 999,
										fontSize: "1.7rem",
										marginLeft: "10px",
										marginRight: "auto",
										marginTop: "10px",
										marginBottom: "auto",
									}}
								/>
							</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
