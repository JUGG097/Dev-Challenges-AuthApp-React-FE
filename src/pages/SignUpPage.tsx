import React, { useState, useEffect } from "react";
import StyledSignUpPage from "../styles/SignUpPage.styled";
import InputText from "../components/InputText";
import {
	AiOutlineGoogle,
	AiOutlineGithub,
} from "react-icons/ai";
import { MdEmail, MdLock } from "react-icons/md";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import {
	errorNotification,
	retrieveTokenFromLocalStorage,
	successNotification,
	validateToken,
} from "../utils/Helpers";
import { authClient } from "../utils/AxiosInstances";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { GITHUB_CLIENT_ID, GITHUB_SERVER_URL } from "../utils/Config";
import { addValue } from "retrievetokens";

const SignUpPage: React.FC<{}> = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);

	const userSignUp = (
		name: string,
		email: string,
		password: string,
		provider: string,
		image?: string
	) => {
		authClient
			.post("/signup", {
				name,
				email,
				password,
				provider,
				image: image || "",
			})
			.then((resp) => {
				if (resp.status === 200) {
					localStorage.clear();
					addValue("authToken", resp.data.authToken, "local");
					addValue("refreshToken", resp.data.refreshToken, "local");
					successNotification(
						"SignUp Success, redirecting to profile page"
					);
					setTimeout(() => {
						setLoading(false);
						navigate("/profile");
					}, 500);
				} else {
					errorNotification("SignUp Failed!, try again");
					setLoading(false);
					localStorage.clear();
				}
			})
			.catch((err) => {
				if (err.response.data) {
					errorNotification(
						"SignUp Failed: " + err.response.data.message
					);
				} else {
					errorNotification("SignUp Failed: " + err.message);
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
					userSignUp(
						res.data.name,
						res.data.email,
						"",
						"GOOGLE",
						res.data.picture
					);
				})
				.catch((err) => {
					setLoading(false);
					errorNotification("SignUp Failed: " + err.message);
				});
		},
		onError: (error) =>
			errorNotification("SignUp Failed: " + error.error_description),
	});

	// const handleFacebookOauth = (resp: ProfileSuccessResponse) => {
	// 	if (resp.email !== undefined && resp.name !== undefined) {
	// 		userSignUp(
	// 			resp.name,
	// 			resp.email,
	// 			"",
	// 			"FACEBOOK",
	// 			resp.picture?.data.url
	// 		);
	// 	}
	// };

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.currentTarget.name]: e.target.value });
	};

	const handleSubmit = () => {
		setLoading(true);
		if (formData.email !== "" && formData.password !== "") {
			userSignUp(
				formData.name,
				formData.email,
				formData.password,
				"LOCAL"
			);
		} else {
			errorNotification("All Fields are required");
			setLoading(false);
		}
	};

	useEffect(() => {
		if (validateToken(retrieveTokenFromLocalStorage("authToken"))) {
			navigate("/profile");
		}
	}, [navigate]);

	return (
		<>
			<StyledSignUpPage>
				<div className="flex items-center justify-center">
					<div className="wrapper-container sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-1/3 px-6 py-6">
						<img
							src="img/devchallenges.svg"
							alt="dev challenges"
							className="py-4"
						/>
						<h4 className="py-3">
							Join thousands of learners from around the world
						</h4>
						<p className="mb-3">
							Master web development by making real-life projects.
							There are multiple paths for you to choose
						</p>

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
									Signing You Up
								</>
							) : (
								"Start Coding Now"
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
								{/* <span className="p-2 mx-2">
									<FacebookLogin
										appId={FACEBOOK_APP_ID}
										render={({ onClick }) => (
											<AiFillFacebook onClick={onClick} />
										)}
										onFail={(error) => {
											errorNotification(
												"Facebook Oauth Failed: " +
													error
											);
										}}
										onProfileSuccess={(resp) => {
											handleFacebookOauth(resp);
										}}
									/>
								</span> */}
								{/* <span className="p-2 mx-2">
									<AiOutlineTwitter />
								</span> */}
								<span className="p-2 mx-2">
									<a
										href={`https://github.com/login/oauth/authorize?
				scope=user:email&client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_SERVER_URL}/api/v1/auth/githubOauth?mode=signup`}
									>
										<AiOutlineGithub />
									</a>
								</span>
							</div>
							<p className="mt-5">
								Already a member?{" "}
								<Link to={"/login"}>Login</Link>
							</p>
						</div>
					</div>
				</div>
			</StyledSignUpPage>
			<Footer widthClass="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-1/3" />
		</>
	);
};

export default SignUpPage;
