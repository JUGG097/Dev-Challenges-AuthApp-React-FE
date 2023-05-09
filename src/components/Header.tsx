import React, { useState } from "react";
import StyledHeader from "../styles/Header.styled";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { deleteTokenFromLocalStorage } from "../utils/Helpers";

import { Skeleton } from "@mui/material";

const Header: React.FC<{
	name: string | null;
	image: string | null;
	loading: Boolean;
}> = ({ name, image, loading }) => {
	const navigate = useNavigate();
	const [showDropDown, setShowDropDown] = useState(false);

	const handleLogOut = () => {
		deleteTokenFromLocalStorage("authToken");
		deleteTokenFromLocalStorage("refreshToken");
		navigate("/login");
	};
	return (
		<StyledHeader>
			<nav className="flex items-center justify-between px-5 pt-5 pb-3">
				<div className="">
					<img src="img/devchallenges.svg" alt="dev challenges" />
				</div>
				<div
					className="flex items-center justify-between cta-dropdown-wrapper"
					onClick={() => setShowDropDown(!showDropDown)}
				>
					<img
						src={image ? image : "img/devchallenges.png"}
						alt="dev challenges"
						className="mr-2"
					/>
					{loading ? (
						<Skeleton sx={{ fontSize: "12px" }} width={"100%"} />
					) : (
						<span className="mr-2">{name ? name : "John Doe"}</span>
					)}

					<span>
						{showDropDown ? <MdArrowDropUp /> : <MdArrowDropDown />}
					</span>
				</div>
			</nav>
			{showDropDown && (
				<div
					className="dropdown-menu px-5 py-4"
					onMouseLeave={() => setShowDropDown(false)}
				>
					<Link
						to={"/profile"}
						className="flex items-center profile"
						onClick={() => setShowDropDown(false)}
					>
						<HiUserCircle />
						<span className="ml-2">My Profile</span>
					</Link>
					<div
						className="flex items-center mt-4 pt-4 logout"
						onClick={handleLogOut}
					>
						<FiLogOut />
						<span className="ml-2">Logout</span>
					</div>
				</div>
			)}
		</StyledHeader>
	);
};

export default Header;
