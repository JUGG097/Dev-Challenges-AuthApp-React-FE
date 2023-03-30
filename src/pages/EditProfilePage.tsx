import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineLeft, AiFillCamera } from "react-icons/ai";
import Footer from "../components/Footer";
import StyledEditProfilePage from "../styles/EditProfilePage.styled";
import InputText from "../components/InputText";

const EditProfilePage = () => {
	return (
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
								src="img/devchallenges.png"
								alt="dev challenges"
							/>
							<AiFillCamera />
							<input
								type="file"
								name="image-file"
								id="image-file"
								className="custom-file-input"
								accept=".jpeg, .jpg, .png, "
							/>
							<label htmlFor="image-file" className="ml-5">CHANGE PHOTO</label>
						</div>

            <div className="mt-4 sm:w-9/12">
              <p>Name</p>
              <InputText holder_text="Enter your name..." inlineIcon={false} id="name"/>
            </div>

            <div className="mt-4 sm:w-9/12">
              <p>Bio</p>
              <InputText holder_text="Enter your bio..." inlineIcon={false} id="bio"/>
            </div>

            <div className="mt-4 sm:w-9/12">
              <p>Phone</p>
              <InputText holder_text="Enter your phone number..." inlineIcon={false} id="phone"/>
            </div>

            <div className="mt-4 sm:w-9/12">
              <p>Email</p>
              <InputText holder_text="Enter your email..." inlineIcon={false} id="email"/>
            </div>

            <div className="mt-4 sm:w-9/12">
              <p>Password</p>
              <InputText holder_text="Enter your new password..." inlineIcon={false} id="password"/>
            </div>

            <div className="mt-4 sm:w-9/12">
              <button>Save</button>
            </div>
					</div>
				</div>
			</StyledEditProfilePage>
			<Footer widthClass="sm:w-10/12 md:w-8/12 lg:w-8/12 px-5" />
		</>
	);
};

export default EditProfilePage;
