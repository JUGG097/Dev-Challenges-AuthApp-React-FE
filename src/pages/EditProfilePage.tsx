import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiFillCamera } from "react-icons/ai";
import Footer from "../components/Footer";
import StyledEditProfilePage from "../styles/EditProfilePage.styled";
import InputText from "../components/InputText";
import Header from "../components/Header";
import {
	headerDataProps,
	updateUserProps,
	userDetailProps,
} from "../utils/Types";
import {
	errorNotification,
	refreshAuthentication,
	retrieveTokenFromLocalStorage,
} from "../utils/Helpers";
import { userClient, cloudinaryClient } from "../utils/AxiosInstances";
import { AxiosResponse } from "axios";
import { Skeleton } from "@mui/material";
import { CLOUDINARY_PRESET } from "../utils/Config";

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
	const [loading, setLoading] = useState(false);
	const [profileLoading, setProfileLoading] = useState(false);
	const [imageUploadLoading, setImageUploadLoading] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.currentTarget.name]: e.target.value });
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		let files = e.target.files;
		let file = files?.item(0);
		const maxAllowedSize = 5 * 1024 * 1024; //Max size of 5mb
		if (file) {
			// Validate file type and File size
			if (
				!["image/png", "image/jpeg", "image/jpg"].includes(file?.type)
			) {
				errorNotification(
					"Only image files (png, jpeg & jpg) are allowed"
				);
			} else if (file?.size > maxAllowedSize) {
				errorNotification("Max size of 5mb allowed");
			} else {
				setImageUploadLoading(true);
				const data = new FormData();
				data.append("file", file);
				data.append("upload_preset", CLOUDINARY_PRESET);
				// Later use signed upload so enable overwriting uploaded images
				cloudinaryClient
					.post("/upload", data)
					.then((res) => {
						if (res.status === 200) {
							setFormData({ ...formData, image: res.data.url });
						} else {
							errorNotification("Image Upload Failed, Try Again");
						}
						setImageUploadLoading(false);
					})
					.catch((err) => {
						errorNotification("Image Upload Failed, Try Again");
						setImageUploadLoading(false);
					});
			}
		}
	};

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
						image: userDetails.image,
					});
					setLoading(false);
				} else {
					errorNotification("Profile Update Failed");
					setLoading(false);
				}
			})
			.catch((err) => {
				if (err.response.status === 401) {
					refreshAuthentication(handleTokenRefreshSucess, navigate);
				} else {
					errorNotification("Profile Update Failed");
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
		setProfileLoading(true);
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
						image: userDetails.image,
					});
					setProfileLoading(false);
				} else {
					errorNotification("Profile Not Found, Login Again");
					navigate("/login");
				}
			})
			.catch((err) => {
				if (err.response === 401) {
					refreshAuthentication(handleTokenRefreshSucess, navigate);
				} else {
					errorNotification("Profile Not Found, Login Again");
					navigate("/login");
				}
			});
	}, [navigate]);
	return (
		<>
			<Header
				name={headerData.name}
				image={headerData.image}
				loading={profileLoading}
			/>

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
							<h4>Changes will be reflected to every services</h4>

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
								<label htmlFor="image-file" className="ml-5">
									CHANGE PHOTO
								</label>
							</div>

							<div className="mt-6 sm:w-9/12">
								<p>Name</p>
								{profileLoading ? (
									<Skeleton variant="rectangular">
										<InputText
											holder_text=""
											inlineIcon={false}
											id=""
											value=""
											handleChange={handleInputChange}
										/>
									</Skeleton>
								) : (
									<InputText
										holder_text="Enter your name..."
										inlineIcon={false}
										id="name"
										value={
											formData.name ? formData.name : ""
										}
										handleChange={handleInputChange}
									/>
								)}
							</div>

							<div className="mt-4 sm:w-9/12">
								<p>Bio</p>
								{profileLoading ? (
									<Skeleton variant="rectangular">
										<InputText
											holder_text=""
											inlineIcon={false}
											id=""
											value=""
											handleChange={handleInputChange}
										/>
									</Skeleton>
								) : (
									<InputText
										holder_text="Enter your bio..."
										inlineIcon={false}
										id="bio"
										value={formData.bio ? formData.bio : ""}
										handleChange={handleInputChange}
									/>
								)}
							</div>

							<div className="mt-4 sm:w-9/12">
								<p>Phone</p>
								{profileLoading ? (
									<Skeleton variant="rectangular">
										<InputText
											holder_text=""
											inlineIcon={false}
											id=""
											value=""
											handleChange={handleInputChange}
										/>
									</Skeleton>
								) : (
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
								)}
							</div>

							<div className="mt-4 sm:w-9/12">
								<button
									onClick={handleSave}
									disabled={loading || imageUploadLoading}
								>
									{loading ? (
										<>
											<img
												src="img/loading.svg"
												alt=""
												className="button-loader"
											/>{" "}
											Updating Data
										</>
									) : imageUploadLoading ? (
										<>
											<img
												src="img/loading.svg"
												alt=""
												className="button-loader"
											/>{" "}
											Uploading Image
										</>
									) : (
										"Save"
									)}
								</button>
							</div>
						</div>
					</div>
				</StyledEditProfilePage>
				<Footer widthClass="sm:w-10/12 md:w-8/12 lg:w-8/12 px-5" />
			</>
		</>
	);
};

export default EditProfilePage;
