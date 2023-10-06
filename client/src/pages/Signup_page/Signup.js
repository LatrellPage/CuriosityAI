import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useGoogleLogin } from "@react-oauth/google";
import {
	faXTwitter,
	faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const eyeIcon = showPassword ? faEyeSlash : faEye;

	const login = useGoogleLogin({
		onSuccess: (codeResponse) => console.log(codeResponse),
		flow: "auth-code",
	});

	

	return (
		<div className="signup-page-div">
			<div className="signup-form">
				<form>
					<h1 style={{ fontWeight: "400", fontSize: "1.5rem", marginLeft: "auto", marginRight: "auto",width: "fit-content" }}>
						<strong
							style={{
								fontWeight: "700",
								fontSize: "2rem",
							}}
						>
							Signup Your Account
						</strong>
					</h1>
					<p style={{ marginTop: "0.5rem", color: "#333333", marginLeft: "auto", marginRight: "auto", width: "fit-content" }}>
						Let's delve into the world of curiosity.
					</p>

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
					<p
						style={{
							fontSize: "1rem",
							fontWeight: "400",
							color: "grey",
							marginTop: "0.3rem",
						}}
					>
						Must be 8 or more characters and contain at least 1
						number and 1 special character.
					</p>

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
						<a onClick={() => login()}>
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
