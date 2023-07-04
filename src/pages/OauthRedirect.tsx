import React, { useEffect } from "react";
import {
	errorNotification,
	successNotification,
	validateToken,
} from "../utils/Helpers";
import { useNavigate } from "react-router-dom";
import { addValue } from "retrievetokens";

const OauthRedirect = () => {
	const queryParameters = new URLSearchParams(window.location.search);
	const authToken = queryParameters.get("authToken");
	const refreshToken = queryParameters.get("refreshToken");
	const mode = queryParameters.get("mode");
	const navigate = useNavigate();

	useEffect(() => {
		if (validateToken(authToken || "")) {
			localStorage.clear();
			addValue("authToken", authToken || "", "local");
			addValue("refreshToken", refreshToken || "", "local");
			mode === "signup"
				? successNotification(
						"GitHub SignUp Success, redirecting to profile page"
				  )
				: successNotification(
						"GitHub Authentication Successful, redirecting to profile page"
				  );

			setTimeout(() => {
				navigate("/profile");
			}, 500);
		} else {
			mode === "signup"
				? errorNotification("GitHub SignUp Failed")
				: errorNotification("GitHub Authentication Failed");
			localStorage.clear();
			navigate("/");
		}
	});
	return (
		<div className="mt-10 text-center">
			<h4 className="to-cyan-700 font-extrabold text-2xl">Oauth Redirect</h4>
            <p>...redirecting...</p>
		</div>
	);
};

export default OauthRedirect;
