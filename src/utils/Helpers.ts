import axios, { AxiosResponse } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import {
	CLOUDINARY_CLOUD_NAME,
	SERVER_PROD_URL,
	SERVER_DEV_URL,
} from "./Config";

export const numberToPixel = (value: number) => {
	return `${value.toString()}px`;
};

export const storeTokenToLocalStorage = (key: string, token: string) => {
	localStorage.setItem(key, token);
};

export const retrieveTokenFromLocalStorage = (key: string) => {
	const itemValue = localStorage.getItem(key);
	if (itemValue) {
		return itemValue;
	}
	return "";
};

export const deleteTokenFromLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};

export const validateToken = (token: string) => {
	try {
		const decodedToken = jwtDecode<JwtPayload>(token);
		const currentTime = Math.round(Date.now() / 1000);

		if (decodedToken.exp) {
			return decodedToken.exp > currentTime;
		}
		return false;
	} catch (error) {
		return false;
	}
};

export const authClient = axios.create({
	baseURL:
		process.env.NODE_ENV === "production"
			? SERVER_PROD_URL + "/api/v1/auth"
			: SERVER_DEV_URL + "/api/v1/auth",
});

export const userClient = axios.create({
	baseURL:
		process.env.NODE_ENV === "production"
			? SERVER_PROD_URL + "/api/v1/user"
			: SERVER_DEV_URL + "/api/v1/user",
});

export const cloudinaryClient = axios.create({
	baseURL: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image`,
});

export const refreshAuthentication = async (
	handleSuccess: (resp: AxiosResponse<any, any>) => void,
	navigationFunction: NavigateFunction
) => {
	try {
		const resp = await authClient.post("/refreshToken", {
			refreshToken: retrieveTokenFromLocalStorage("refreshToken"),
		});
		if (resp.status === 200) {
			deleteTokenFromLocalStorage("authToken");
			storeTokenToLocalStorage("authToken", resp.data.authToken);
			handleSuccess(resp);
		} else {
			deleteTokenFromLocalStorage("refreshToken");
			deleteTokenFromLocalStorage("authToken");
			errorNotification("Profile Not Found, Login Again");
			navigationFunction("/login");
		}
	} catch (err) {
		deleteTokenFromLocalStorage("refreshToken");
		deleteTokenFromLocalStorage("authToken");
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
