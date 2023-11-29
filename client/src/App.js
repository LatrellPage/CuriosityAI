import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import Chat from "./pages/Chat_page/Chat";
import Login from "./pages/Login_page/Login";
import Signup from "./pages/Signup_page/Signup";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { AuthProvider, AuthContext } from "./context/authContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // User is not authenticated, redirect to login
        return <Navigate to="/login" replace />;
    }

    return children;
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
                    <GoogleOAuthProvider clientId="...your-client-id...">
                        <BrowserRouter>
                            <Routes>
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
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
