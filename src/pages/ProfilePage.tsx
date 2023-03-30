import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import StyledProfilePage from "../styles/ProfilePage.styled";

const ProfilePage = () => {
	return (
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
							<p>Some info may be visible to other people</p>
						</div>

						<Link to={"/editprofile"} className="flex justify-end">
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

						<p className="truncate sm:w-6/12">John Doe</p>
					</div>
					<div className="breaklines w-full my-5"></div>
					<div className="profile-bio flex items-center justify-between w-full sm:w-11/12 lg:w-10/12 sm:justify-self-start px-5">
						<div className="mr-9 sm:w-6/12">
							<h5>BIO</h5>
						</div>

						<p className="truncate sm:w-6/12">
							John Doe is a doctor qweetuq desad wer ert
						</p>
					</div>
					<div className="breaklines w-full my-5"></div>
					<div className="profile-phone flex items-center justify-between w-full sm:w-11/12 lg:w-10/12 sm:justify-self-start px-5">
						<div className="mr-9 sm:w-6/12">
							<h5>PHONE</h5>
						</div>

						<p className="truncate sm:w-6/12">07950749025</p>
					</div>
					<div className="breaklines w-full my-5"></div>
					<div className="profile-email flex items-center justify-between w-full sm:w-11/12 lg:w-10/12 sm:justify-self-start px-5">
						<div className="mr-9 sm:w-6/12">
							<h5>EMAIL</h5>
						</div>

						<p className="truncate sm:w-6/12">johndoe@gmail.com</p>
					</div>
				</div>
			</StyledProfilePage>
			<Footer widthClass="sm:w-10/12 md:w-8/12 lg:w-8/12" />
		</>
	);
};

export default ProfilePage;
