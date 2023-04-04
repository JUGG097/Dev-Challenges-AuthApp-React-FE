import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Sign Up Page Rendering", () => {
	test("Sign Up Input Fields Rendered", () => {
		render(<App />, { wrapper: BrowserRouter });
		expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});
	test("Social Media Sign Up Icons Rendered", () => {
		render(<App />, { wrapper: BrowserRouter });
		expect(
			screen.getByText("or continue with these social profile")
		).toBeInTheDocument();
	});
	test("Link to Login Page Present", () => {
		render(<App />, { wrapper: BrowserRouter });
		expect(screen.getByText("Login")).toBeInTheDocument();
	});
	test("Footer present", () => {
		render(<App />, { wrapper: BrowserRouter });
		expect(screen.getByText("created by me")).toBeInTheDocument();
		expect(screen.getByText("devChallenges.io")).toBeInTheDocument();
	});
});

describe("Login Page Rendering", () => {
	test("Redirect from sign up page", () => {
		render(<App />, { wrapper: BrowserRouter });
		expect(screen.queryByText("Register")).not.toBeInTheDocument();
		userEvent.click(screen.getByText("Login"));
		expect(screen.getByText("Register")).toBeInTheDocument();
	})
	test("Login Input Fields Rendered", () => {
		render(
			<MemoryRouter initialEntries={["/login"]}>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});
	test("Social Media Login Up Icons Rendered", () => {
		render(
			<MemoryRouter initialEntries={["/login"]}>
				<App />
			</MemoryRouter>
		);

		expect(
			screen.getByText("or continue with these social profile")
		).toBeInTheDocument();
	});
	test("Link to SignUp Page Present", () => {
		render(
			<MemoryRouter initialEntries={["/login"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText("Register")).toBeInTheDocument();
	});
	test("Footer present", () => {
		render(
			<MemoryRouter initialEntries={["/login"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText("created by me")).toBeInTheDocument();
		expect(screen.getByText("devChallenges.io")).toBeInTheDocument();
	});
});
