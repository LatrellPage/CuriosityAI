import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./index.css";
import Chat from "./pages/Chat_page/Chat";
import Login from "./pages/Login_page/Login";
import Signup from "./pages/Signup_page/Signup";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { AuthProvider, AuthContext } from "./context/authContext";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedTokenHandler = () => {
    const { user, login } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");
    
        if (token && !user) {
            login({ token });
        } else if (!token && !user) {
            navigate("/login");
        }
    }, [location, navigate, login, user]);
    

    return user ? <Chat /> : null;
};




const NotFound = () => {
	return (
		<div>
			<h1>404 Not Found</h1>
			<p>The page you are looking for does not exist.</p>
		</div>
	);
};

function App() {
    return (
        <div>
            <AuthProvider>
                <ApolloProvider client={client}>
                    <GoogleOAuthProvider clientId="955396247779-g8ebte54c7ltemb1e5cq6ohluta47jtm.apps.googleusercontent.com">
                        <BrowserRouter>
                            <Routes>
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/" element={<ProtectedTokenHandler />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </BrowserRouter>
                    </GoogleOAuthProvider>
                </ApolloProvider>
            </AuthProvider>
        </div>
    );
}


export default App;
