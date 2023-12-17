import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../../queries";
import { AuthContext } from "../../context/authContext";
import Alert from "@mui/material/Alert";

const Signup = () => {

	const context = useContext(AuthContext);
	let navigate = useNavigate();
	const [errors, setErrors] = useState();

	const [registerUser] = useMutation(REGISTER_USER, {
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
							backgroundColor: "black",
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
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
