import { AxiosResponse } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { authClient } from "./AxiosInstances";
import { addValue, deleteValue, retrieveValue, deleteValues } from "retrievetokens";

export const numberToPixel = (value: number) => {
	return `${value.toString()}px`;
};

export const retrieveTokenFromLocalStorage = (key: string) => {
	const itemValue = retrieveValue(key, "local");
	if (itemValue) {
		return itemValue;
	}
	return "";
};

export const validateToken = (token: string) => {
	try {
		const decodedToken = jwtDecode<JwtPayload>(token);
		const currentTime = Math.round(Date.now() / 1000);

		if (decodedToken.exp) {
			return decodedToken.exp > currentTime;
		}
		deleteValue("authToken", "local");
		return false;
	} catch (error) {
		deleteValue("authToken", "local");
		return false;
	}
};

export const refreshAuthentication = async (
	handleSuccess: (resp: AxiosResponse<any, any>) => void,
	navigationFunction: NavigateFunction
) => {
	try {
		const resp = await authClient.post("/refreshToken", {
			refreshToken: retrieveTokenFromLocalStorage("refreshToken"),
		});
		if (resp.status === 200) {
			deleteValue("authToken", "local");
			addValue("authToken", resp.data.authToken, "local");
			handleSuccess(resp);
		} else {
			deleteValues(["refreshToken", "authToken"], "local")
			errorNotification("Profile Not Found, Login Again");
			navigationFunction("/login");
		}
	} catch (err) {
		deleteValues(["refreshToken", "authToken"], "local")
		errorNotification("Profile Not Found, Login Again");
		navigationFunction("/login");
	}
};

export const successNotification = (msg: string) => {
	toast.success(msg, {
		position: toast.POSITION.TOP_CENTER,
	});
};

export const errorNotification = (msg: string) => {
	toast.error(msg, {
		position: toast.POSITION.TOP_CENTER,
	});
};
