import axios from "axios";
import {
	CLOUDINARY_CLOUD_NAME,
	SERVER_PROD_URL,
	SERVER_DEV_URL,
} from "./Config"

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