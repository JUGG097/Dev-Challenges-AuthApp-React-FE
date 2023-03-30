import React from "react";
import SignUpPage from "./pages/SignUpPage";
import { GlobalStyle } from "./styles/GlobalStyles";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import Header from "./components/Header";

function App() {
	return (
		<>
			<GlobalStyle />
			<Header />
			<div className="container sm:px-3 md:px-6 lg:px-9 xl:px-12 m-auto">
				<Routes>
					<Route path="/" element={<SignUpPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/editprofile" element={<EditProfilePage />} />
				</Routes>
				{/* <Footer /> */}
			</div>
		</>
	);
}

export default App;
