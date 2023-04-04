import React from "react";
import StyledLoginPage from "../styles/LoginPage.styled";
import InputText from "../components/InputText";
import {
	AiFillFacebook,
	AiOutlineGoogle,
	AiOutlineTwitter,
	AiOutlineGithub,
} from "react-icons/ai";

import { MdEmail, MdLock } from "react-icons/md";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const LoginPage = () => {
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
								icon={<MdEmail />}
							/>
						</div>

						<div className="my-2">
							<InputText
								holder_text="Password"
								inlineIcon={true}
								id="password"
								icon={<MdLock />}
							/>
						</div>

						<button className="my-3">Login</button>

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
