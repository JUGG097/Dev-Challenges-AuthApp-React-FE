import React, { ReactElement } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import { GOOGLE_CLIENT_ID } from "../utils/Config";
import { RenderOptions, render } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { authClient, userClient } from "../utils/AxiosInstances";

export const AllTheProviders = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<BrowserRouter>{children}</BrowserRouter>
		</GoogleOAuthProvider>
	);
};

export const providersWithGoogleAuth = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			{children}
		</GoogleOAuthProvider>
	);
};

export const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export const customRenderWithGoogleAuth = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: providersWithGoogleAuth, ...options });

export const MockedAuthClient = new MockAdapter(authClient, {
	onNoMatch: "throwException",
});

export const MockedUserClient = new MockAdapter(userClient, {
	onNoMatch: "throwException",
});
