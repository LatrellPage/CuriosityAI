import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Chat from "./pages/Chat_page/Chat";
import Login from "./pages/Login_page/Login";
import Signup from "./pages/Signup_page/Signup";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
	uri: "http://localhost:3001/graphql",
	cache: new InMemoryCache(),
});

function App() {
	return (
		<div>
			<ApolloProvider client={client}>
				<GoogleOAuthProvider clientId="955396247779-5mhiuh20hjk6o9o677isg2582v2715co.apps.googleusercontent.com">
					<BrowserRouter>
						<Routes>
							<Route path="/signup" element={<Signup />} />
							<Route path="/login" element={<Login />} />
							<Route path="*" element={<Chat />} />
						</Routes>
					</BrowserRouter>
				</GoogleOAuthProvider>
			</ApolloProvider>
		</div>
	);
}

export default App;
