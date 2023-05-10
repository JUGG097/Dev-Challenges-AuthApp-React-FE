import React, { useState } from "react";
import StyledLoginPage from "../styles/LoginPage.styled";
import InputText from "../components/InputText";
import {
	AiFillFacebook,
	AiOutlineGoogle,
	AiOutlineTwitter,
	AiOutlineGithub,
} from "react-icons/ai";

import { MdEmail, MdLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import {
	authClient,
	errorNotification,
	storeTokenToLocalStorage,
	successNotification,
} from "../utils/Helpers";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);

	const userLogin = (
		uri: string,
		email: string,
		password: string,
		provider: string
	) => {
		authClient
			.post(uri, { email, password, provider })
			.then((resp) => {
				if (resp.status === 200) {
					localStorage.clear();
					storeTokenToLocalStorage("authToken", resp.data.authToken);
					storeTokenToLocalStorage(
						"refreshToken",
						resp.data.refreshToken
					);
					successNotification(
						"Authentication successful, redirecting to profile page"
					);
					setTimeout(() => {
						setLoading(false);
						navigate("/profile");
					}, 500);
				} else {
					errorNotification("Authentication failed, try again");
					localStorage.clear();
				}
			})
			.catch((err) => {
				const errData = err.response.data;
				if (errData) {
					errorNotification(
						`Authentication failed: ${
							errData.message === "Bad Credentials"
								? "Invalid Email/Password (Are you signed up?)"
								: errData.message
						} `
					);
				} else {
					errorNotification("Authentication failed: Unknown Error");
				}
				setLoading(false);
				localStorage.clear();
			});
	};

	const handleGoogleOauth = useGoogleLogin({
		onSuccess: (resp) => {
			setLoading(true);
			axios
				.get(
					`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${resp.access_token}`,
					{
						headers: {
							Authorization: `Bearer ${resp.access_token}`,
							Accept: "application/json",
						},
					}
				)
				.then((res) => {
					userLogin("/oauthLogin", res.data.email, "", "GOOGLE");
				})
				.catch((err) => {
					setLoading(false);
					errorNotification("SignUp Failed: " + err.message);
				});
		},
		onError: (error) =>
			errorNotification("SignUp Failed: " + error.error_description),
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.currentTarget.name]: e.target.value });
	};

	const handleSubmit = () => {
		setLoading(true);
		if (formData.email !== "" && formData.password !== "") {
			userLogin("/login", formData.email, formData.password, "LOCAL");
		} else {
			errorNotification("All Fields are required");
			setLoading(false);
		}
	};

	return (
		<>
			<StyledLoginPage>
				<div className="flex items-center justify-center">
					<div className="wrapper-container sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-1/3 px-6 py-6">
						<img
							src="img/devchallenges.svg"
							alt="dev challenges"
							className="py-4"
						/>
						<h4 className="py-3">Login</h4>
						<div className="my-5">
							<InputText
								holder_text="Email"
								inlineIcon={true}
								id="email"
								value={formData.email}
								icon={<MdEmail />}
								handleChange={handleInputChange}
							/>
						</div>

						<div className="my-2">
							<InputText
								holder_text="Password"
								inlineIcon={true}
								id="password"
								value={formData.password}
								icon={<MdLock />}
								handleChange={handleInputChange}
								type="password"
							/>
						</div>

						<button
							className="my-3"
							onClick={handleSubmit}
							disabled={loading}
						>
							{loading ? (
								<>
									<img
										src="img/loading.svg"
										alt=""
										className="button-loader"
									/>{" "}
									Verifying Credentials
								</>
							) : (
								"Login"
							)}
						</button>

						<div className="social-signup flex text-center flex-col">
							<p className="mt-5">
								or continue with these social profile
							</p>
							<div className="mt-5 media-icons flex justify-center">
								<span className="p-2 mx-2">
									<AiOutlineGoogle
										onClick={() => handleGoogleOauth()}
									/>
								</span>
								<span className="p-2 mx-2">
									<AiFillFacebook />
								</span>
								<span className="p-2 mx-2">
									<AiOutlineTwitter />
								</span>
								<span className="p-2 mx-2">
									<AiOutlineGithub />
								</span>
							</div>
							<p className="mt-5">
								Don’t have an account yet?{" "}
								<Link to={"/"}>Register</Link>
							</p>
						</div>
					</div>
				</div>
			</StyledLoginPage>
			<Footer widthClass="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-1/3" />
		</>
	);
};

export default LoginPage;
