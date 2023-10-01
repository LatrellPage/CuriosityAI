import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Chat from "./pages/Chat_page/Chat";
import Login from "./pages/Login_page/Login";
import Signup from "./pages/Signup_page/Signup";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<Chat />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
