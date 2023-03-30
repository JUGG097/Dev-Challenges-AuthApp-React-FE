import React from "react";
import StyledFooter from "../styles/Footer.styled";

const Footer: React.FC<{ widthClass: string }> = ({ widthClass }) => {
	return (
		<StyledFooter>
			<div className="flex justify-center mt-5">
				<div className={`footer-wrapper ${widthClass} px-1 mb-2`}>
					<div className="flex">
						<p className="">created by me</p>
						<p className="flex justify-end">devChallenges.io</p>
					</div>
				</div>
			</div>
		</StyledFooter>
	);
};

export default Footer;
