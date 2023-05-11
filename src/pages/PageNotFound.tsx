import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
	return (
		<div className="mt-10 text-center">
			<h2 className="to-cyan-700 font-extrabold text-2xl">
				404 Page Not Found!
			</h2>
			Don’t have an account yet?{" "}
			<Link
				to={"/"}
				style={{
					color: "#2d9cdb",
				}}
			>
				Register
			</Link>
		</div>
	);
};

export default PageNotFound;
