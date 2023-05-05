import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiFillCamera } from "react-icons/ai";
import Footer from "../components/Footer";
import StyledEditProfilePage from "../styles/EditProfilePage.styled";
import InputText from "../components/InputText";
import Header from "../components/Header";
import { headerDataProps, updateUserProps, userDetailProps } from "../utils/Types";
import {
	refreshAuthentication,
	retrieveTokenFromLocalStorage,
	userClient,
} from "../utils/Helpers";
import { AxiosResponse } from "axios";

const EditProfilePage = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<updateUserProps>({
		name: null,
		bio: null,
		phoneNumber: null,
		image: null,
	});
	const [headerData, setHeaderData] = useState<headerDataProps>({
		name: "John Doe",
		image: null,
	});

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.currentTarget.name]: e.target.value });
	};

	const handleImageUpload = () => {};

	const handleSave = () => {
		setLoading(true);
		userClient
			.put("/editProfile", formData, {
				headers: {
					Authorization:
						"Bearer " + retrieveTokenFromLocalStorage("authToken"),
				},
			})
			.then((resp) => {
				if (resp.status === 200) {
					const userDetails: userDetailProps = resp.data.data;
					setFormData({
						name: userDetails.name,
						bio: userDetails.bio,
						phoneNumber: userDetails.phoneNumber,
						image: userDetails.image,
					});
					setHeaderData({
						name: userDetails.name,
						image: userDetails.image
					})
					setLoading(false);
				} else {
					console.log("Profile could not be updated");
					setError("Profile could not be updated");
					setLoading(false);
				}
			})
			.catch((err) => {
				if (err.response.status === 401) {
					refreshAuthentication(handleTokenRefreshSucess, navigate);
				} else {
					console.log("Error occured", err);
					setError("Profile not found");
				}
			});
	};

	const handleTokenRefreshSucess = (resp: AxiosResponse<any, any>) => {
		const userDetails: userDetailProps = resp.data.data;
		setFormData({
			name: userDetails.name,
			bio: userDetails.bio,
			phoneNumber: userDetails.phoneNumber,
			image: userDetails.image,
		});
		setLoading(false);
	};

	useEffect(() => {
		setLoading(true);
		userClient
			.get("/profile", {
				headers: {
					Authorization:
						"Bearer " + retrieveTokenFromLocalStorage("authToken"),
				},
			})
			.then((resp) => {
				if (resp.status === 200) {
					const userDetails: userDetailProps = resp.data.data;
					setFormData({
						name: userDetails.name,
						bio: userDetails.bio,
						phoneNumber: userDetails.phoneNumber,
						image: userDetails.image,
					});
					setHeaderData({
						name: userDetails.name,
						image: userDetails.image
					})
					setLoading(false);
				} else {
					console.log("Profile not found");
					setError("Profile not found");
					navigate("/login");
				}
			})
			.catch((err) => {
				if (err.response === 401) {
					refreshAuthentication(handleTokenRefreshSucess, navigate);
				} else {
					console.log("Error occured", err);
					setError("Profile not found");
					navigate("/login");
				}
			});
	}, [navigate]);
	return (
		<>
			<Header name={headerData.name} image={headerData.image} />
			{loading ? (
				<p>Fetching Data</p>
			) : error === "" ? (
				<>
					<StyledEditProfilePage>
						<div className="m-auto sm:w-10/12 md:w-8/12 lg:w-8/12 px-5 mt-5">
							<Link
								to={"/profile"}
								className="profile-back mb-4 flex items-center"
							>
								<AiOutlineLeft />
								<span className="ml-2">Back</span>
							</Link>
							<div className="edit-form sm:px-5 py-5">
								<h2>Change Info</h2>
								<h4>
									Changes will be reflected to every services
								</h4>

								<div className="image-upload mt-4 flex items-center">
									<img
										src={
											formData.image
												? formData.image
												: "img/devchallenges.png"
										}
										alt="dev challenges"
									/>
									<AiFillCamera />
									<input
										type="file"
										name="image-file"
										id="image-file"
										className="custom-file-input"
										accept=".jpeg, .jpg, .png, "
										onChange={handleImageUpload}
									/>
									<label
										htmlFor="image-file"
										className="ml-5"
									>
										CHANGE PHOTO
									</label>
								</div>

								<div className="mt-6 sm:w-9/12">
									<p>Name</p>
									<InputText
										holder_text="Enter your name..."
										inlineIcon={false}
										id="name"
										value={
											formData.name ? formData.name : ""
										}
										handleChange={handleInputChange}
									/>
								</div>

								<div className="mt-4 sm:w-9/12">
									<p>Bio</p>
									<InputText
										holder_text="Enter your bio..."
										inlineIcon={false}
										id="bio"
										value={formData.bio ? formData.bio : ""}
										handleChange={handleInputChange}
									/>
								</div>

								<div className="mt-4 sm:w-9/12">
									<p>Phone</p>
									<InputText
										holder_text="Enter your phone number..."
										inlineIcon={false}
										id="phoneNumber"
										value={
											formData.phoneNumber
												? formData.phoneNumber
												: ""
										}
										handleChange={handleInputChange}
									/>
								</div>

								{/* <div className="mt-4 sm:w-9/12">
              <p>Email</p>
              <InputText holder_text="Enter your email..." inlineIcon={false} id="email"/>
            </div> */}

								{/* <div className="mt-4 sm:w-9/12">
              <p>Password</p>
              <InputText holder_text="Enter your new password..." inlineIcon={false} id="password"/>
            </div> */}

								<div className="mt-4 sm:w-9/12">
									<button onClick={handleSave}>Save</button>
								</div>
							</div>
						</div>
					</StyledEditProfilePage>
					<Footer widthClass="sm:w-10/12 md:w-8/12 lg:w-8/12 px-5" />
				</>
			) : (
				<p>Error Occured</p>
			)}
		</>
	);
};

export default EditProfilePage;
