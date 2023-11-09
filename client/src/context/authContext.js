import React, { useReducer, createContext, useEffect } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
	user: null,
};

if (localStorage.getItem("token")) {
	const decodedToken = jwtDecode(localStorage.getItem("token"));

	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem("token");
	} else {
		initialState.user = decodedToken; 
	}
}

const AuthContext = createContext({
	user: null,
	login: (userData) => {},
	logout: () => {},
	setUser: () => {}, 
});

function authReducer(state, action) {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
			};
		case "SET_USER":
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
}

function AuthProvider(props) {
	const [state, dispatch] = useReducer(authReducer, initialState);

	
	const login = (userData) => {
		localStorage.setItem("token", userData.token);
		dispatch({
			type: "LOGIN",
			payload: userData,
		});
	};

	
	function logout() {
		localStorage.removeItem("token");
		dispatch({
			type: "LOGOUT",
		});
	}

	
	const setUser = () => {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = jwtDecode(token);
			dispatch({
				type: "SET_USER",
				payload: {
					...decodedToken, 
				},
			});
		}
	};

	
	useEffect(() => {
		setUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user: state.user, login, logout, setUser }}
			{...props}
		/>
	);
}

export { AuthContext, AuthProvider };
