import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import StyledProfilePage from "../styles/ProfilePage.styled";
import Header from "../components/Header";
import {
	refreshAuthentication,
	retrieveTokenFromLocalStorage,
	userClient,
} from "../utils/Helpers";
import { userDetailProps } from "../utils/Types";
import { AxiosResponse } from "axios";

const ProfilePage = () => {
	const navigate = useNavigate();
	const [userDetails, setUserDetails] = useState<userDetailProps>({
		id: 0,
		name: null,
		email: "",
		bio: null,
		phoneNumber: null,
		image: null,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const handleTokenRefreshSucess = (resp: AxiosResponse<any, any>) => {
		setUserDetails(resp.data.data);
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
					setUserDetails(resp.data.data);
					setLoading(false);
				} else {
					console.log("Profile not found");
					setError("Profile not found");
					navigate("/login");
				}
			})
			.catch((err) => {
				if (err.response.status === 401) {
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
			<Header name={userDetails.name} image={userDetails.image} />
			{loading ? (
				<p>Fetching Data</p>
			) : error === "" ? (
				<>
					<StyledProfilePage>
						<div className="text-center">
							<h2>Personal info</h2>
							<h4>Basic info, like your name and photo</h4>
						</div>

						<div className="profile-details m-auto sm:w-10/12 md:w-8/12 lg:w-8/12 py-5 mt-10">
							<div className="link-editprofile flex items-center justify-between w-full px-5">
								<div className="w-1/2 sm:w-full">
									<h3>Profile</h3>
									<p>
										Some info may be visible to other people
									</p>
								</div>

								<Link
									to={"/editprofile"}
									className="flex justify-end"
								>
									<button>Edit</button>
								</Link>
							</div>
							<div className="breaklines w-0 sm:w-full my-5"></div>
							<div className="flex items-center justify-between w-full sm:w-11/12 lg:w-10/12 sm:justify-self-start px-5">
								<div className="mr-9 sm:w-6/12">
									<h5>PHOTO</h5>
								</div>

								<div className="sm:w-6/12 flex justify-start">
									<img
										src="img/devchallenges.png"
										alt="dev challenges"
									/>
								</div>
							</div>
							<div className="breaklines w-full my-5"></div>
							<div className="profile-photo flex items-center justify-between w-full sm:w-11/12 lg:w-10/12 sm:justify-self-start px-5">
								<div className="mr-9 sm:w-6/12">
									<h5>NAME</h5>
								</div>

								<p className="truncate sm:w-6/12">
									{userDetails.name
										? userDetails.name
										: ""}
								</p>
							</div>
							<div className="breaklines w-full my-5"></div>
							<div className="profile-bio flex items-center justify-between w-full sm:w-11/12 lg:w-10/12 sm:justify-self-start px-5">
								<div className="mr-9 sm:w-6/12">
									<h5>BIO</h5>
								</div>

								<p className="truncate sm:w-6/12">
									{userDetails.bio
										? userDetails.bio
										: ""}
								</p>
							</div>
							<div className="breaklines w-full my-5"></div>
							<div className="profile-phone flex items-center justify-between w-full sm:w-11/12 lg:w-10/12 sm:justify-self-start px-5">
								<div className="mr-9 sm:w-6/12">
									<h5>PHONE</h5>
								</div>

								<p className="truncate sm:w-6/12">
									{userDetails.phoneNumber
										? userDetails.phoneNumber
										: ""}
								</p>
							</div>
							<div className="breaklines w-full my-5"></div>
							<div className="profile-email flex items-center justify-between w-full sm:w-11/12 lg:w-10/12 sm:justify-self-start px-5">
								<div className="mr-9 sm:w-6/12">
									<h5>EMAIL</h5>
								</div>

								<p className="truncate sm:w-6/12">
									{userDetails.email}
								</p>
							</div>
						</div>
					</StyledProfilePage>
					<Footer widthClass="sm:w-10/12 md:w-8/12 lg:w-8/12" />
				</>
			) : (
				<p>Error Occured</p>
			)}
		</>
	);
};

export default ProfilePage;
