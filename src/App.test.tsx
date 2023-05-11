import React, { ReactElement } from "react";
import { RenderOptions, render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./utils/Config";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<BrowserRouter>{children}</BrowserRouter>
		</GoogleOAuthProvider>
	);
};

const providersWithGoogleAuth = ({
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

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

const customRenderWithGoogleAuth = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: providersWithGoogleAuth, ...options });

describe("Sign Up Page Rendering", () => {
	test("Sign Up Input Fields Rendered", () => {
		customRender(<App />);
		expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});
	test("Social Media Sign Up Icons Rendered", () => {
		customRender(<App />);
		expect(
			screen.getByText("or continue with these social profile")
		).toBeInTheDocument();
	});
	test("Link to Login Page Present", () => {
		customRender(<App />);
		expect(screen.getByText("Login")).toBeInTheDocument();
	});
	test("Footer present", () => {
		customRender(<App />);
		expect(screen.getByText("created by me")).toBeInTheDocument();
		expect(screen.getByText("devChallenges.io")).toBeInTheDocument();
	});
});

describe("Login Page Rendering", () => {
	test("Redirect from sign up page", () => {
		customRender(<App />);
		expect(screen.queryByText("Register")).not.toBeInTheDocument();
		userEvent.click(screen.getByText("Login"));
		expect(screen.getByText("Register")).toBeInTheDocument();
	});
	test("Login Input Fields Rendered", () => {
		customRenderWithGoogleAuth(
			<MemoryRouter initialEntries={["/login"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});
	test("Social Media Login Up Icons Rendered", () => {
		customRenderWithGoogleAuth(
			<MemoryRouter initialEntries={["/login"]}>
				<App />
			</MemoryRouter>
		);
		expect(
			screen.getByText("or continue with these social profile")
		).toBeInTheDocument();
	});
	test("Link to SignUp Page Present", () => {
		customRenderWithGoogleAuth(
			<MemoryRouter initialEntries={["/login"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText("Register")).toBeInTheDocument();
	});
	test("Footer present", () => {
		customRenderWithGoogleAuth(
			<MemoryRouter initialEntries={["/login"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText("created by me")).toBeInTheDocument();
		expect(screen.getByText("devChallenges.io")).toBeInTheDocument();
	});
});
