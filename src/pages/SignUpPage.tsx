import React, { useState } from "react";
import StyledSignUpPage from "../styles/SignUpPage.styled";
import InputText from "../components/InputText";
import {
	AiFillFacebook,
	AiOutlineGoogle,
	AiOutlineTwitter,
	AiOutlineGithub,
} from "react-icons/ai";

import { MdEmail, MdLock } from "react-icons/md";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import {
	authClient,
	storeTokenToLocalStorage,
} from "../utils/Helpers";

const SignUpPage: React.FC<{}> = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.currentTarget.name]: e.target.value });
	};

	const handleSubmit = () => {
		if (formData.email !== "" && formData.password !== "") {
			authClient
				.post("/signup", formData)
				.then((resp) => {
					if (resp.status === 200) {
						localStorage.clear();
						storeTokenToLocalStorage(
							"authToken",
							resp.data.authToken
						);
						storeTokenToLocalStorage(
							"refreshToken",
							resp.data.refreshToken
						);
						setTimeout(() => {
							navigate("/profile");
						}, 500);
					} else {
						console.log("Sign Up Failed");
					}
				})
				.catch((err) => {
					console.log("Error occured", err);
				});
		}
	};

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

						<button className="my-3" onClick={handleSubmit}>
							Start Coding now
						</button>

						<div className="social-signup flex text-center flex-col">
							<p className="mt-5">
								or continue with these social profile
							</p>
							<div className="mt-5 media-icons flex justify-center">
								<span className="p-2 mx-2">
									<AiOutlineGoogle />
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
