import React from "react";
import SignUpPage from "./pages/SignUpPage";
import { GlobalStyle } from "./styles/GlobalStyles";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import { protectedRouteProps } from "./utils/Types";
import { retrieveTokenFromLocalStorage, validateToken } from "./utils/Helpers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OauthRedirect from "./pages/OauthRedirect";
import PageNotFound from "./pages/PageNotFound";

const ProtectedWrapper = ({ isAllowed, children }: protectedRouteProps) => {
	return isAllowed ? children : <Navigate to="/login" replace={true} />;
};

function App() {
	return (
		<>
			<GlobalStyle />
			<div className="container sm:px-3 md:px-6 lg:px-9 xl:px-12 m-auto">
				<Routes>
					<Route path="/" element={<SignUpPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/oauthRedirect" element={<OauthRedirect />} />
					<Route
						path="/profile"
						element={
							<ProtectedWrapper
								isAllowed={validateToken(
									retrieveTokenFromLocalStorage("authToken")
								)}
							>
								<ProfilePage />
							</ProtectedWrapper>
						}
					/>
					<Route
						path="/editprofile"
						element={
							<ProtectedWrapper
								isAllowed={validateToken(
									retrieveTokenFromLocalStorage("authToken")
								)}
							>
								<EditProfilePage />
							</ProtectedWrapper>
						}
					/>
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</div>

			<ToastContainer autoClose={1000} theme="dark" />
		</>
	);
}

export default App;
