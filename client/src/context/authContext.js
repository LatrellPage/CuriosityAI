import React, { useReducer, createContext, useRef, useEffect} from "react";
import jwtDecode from "jwt-decode";

const initialState = {
    user: null,
};

const token = localStorage.getItem("token");
if (token) {
    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 >= Date.now()) {
            initialState.user = decodedToken;
        } else {
            localStorage.removeItem("token");
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
    }
}

const AuthContext = createContext({
	user: null,
	login: (userData) => {},
	logout: () => {},
	register: (userData) => {},
	setUser: () => {},
});

function authReducer(state, action) {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload,
			};
		case "REGISTER":
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
		if (userData && typeof userData.token === 'string') {
			localStorage.setItem("token", userData.token);
			try {
				const decodedToken = jwtDecode(userData.token);
				dispatch({
					type: "LOGIN",
					payload: decodedToken, 
				});
			} catch (error) {
				console.error("Error decoding token:", error);
			}
		} else {
			console.error("Invalid or missing token in userData");
		}
	};
	

    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
    };

    const register = (userData) => {
        // Clear any existing token in local storage
        localStorage.removeItem("token");

        // Decode and set the new token, assuming it's part of userData
        localStorage.setItem("token", userData.token);
        const decodedToken = jwtDecode(userData.token);
        dispatch({
            type: "LOGIN",
            payload: decodedToken,
        });
	};

    const setUser = () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 >= Date.now()) {
                    dispatch({
                        type: "SET_USER",
                        payload: decodedToken,
                    });
                } else {
                    dispatch({ type: "LOGOUT" });
                }
            } catch (error) {
                console.error("Error decoding token on useEffect:", error);
                dispatch({ type: "LOGOUT" });
            }
        }
    };

	const setUserCalled = useRef(false);

	useEffect(() => {
        if (!setUserCalled.current) {
            setUser();
            setUserCalled.current = true;
        }
    }, []);

    return (
		<AuthContext.Provider
		value={{ user: state.user, login, logout, setUser, register }}
		{...props}
	/>
    );
}

export { AuthContext, AuthProvider };
