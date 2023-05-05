import axios, { AxiosResponse } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { NavigateFunction } from "react-router-dom";

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
			? ""
			: "http://localhost:8080/api/v1/auth",
});

export const userClient = axios.create({
	baseURL:
		process.env.NODE_ENV === "production"
			? ""
			: "http://localhost:8080/api/v1/user",
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
			navigationFunction("/login");
		}
	} catch (err) {
		deleteTokenFromLocalStorage("refreshToken");
		deleteTokenFromLocalStorage("authToken");
		navigationFunction("/login");
	}
};
