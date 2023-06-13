import { cleanup, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import * as Helpers from "../utils/Helpers";
import { MockedUserClient, customRenderWithGoogleAuth } from "./TestHelpers";

describe("Profile Page Test", () => {
	beforeEach(() => {
		MockedUserClient.reset();
	});
	afterEach(cleanup);

	test("Profile Page Renders", async () => {
		const data = {
			data: {
				id: 23,
				name: "Peter Pan",
				email: "johndoe@gmail.com",
				bio: "",
				phoneNumber: "01234567",
				image: "",
			},
		};

		MockedUserClient.onGet("/profile").reply(200, data);

		jest.spyOn(Helpers, "validateToken")
			.mockReturnValue(false)
			.mockReturnValueOnce(true);

		customRenderWithGoogleAuth(
			<MemoryRouter initialEntries={["/profile"]}>
				<App />
			</MemoryRouter>
		);

		// Check that Profile Page renders correctly
		expect(screen.getByText("Personal info")).toBeInTheDocument();
		expect(screen.getByText("Profile")).toBeInTheDocument();

		// Wait API call to get details
		await waitFor(() => screen.findAllByText("Peter Pan"));
		expect(screen.getByText("johndoe@gmail.com")).toBeInTheDocument();
		expect(screen.getByText("01234567")).toBeInTheDocument();
	});

	test("Profile Data Does Not Fetch", async () => {
		MockedUserClient.onGet("/profile").reply(400);

		jest.spyOn(Helpers, "validateToken")
			.mockReturnValue(false)
			.mockReturnValueOnce(true);

		customRenderWithGoogleAuth(
			<MemoryRouter initialEntries={["/profile"]}>
				<App />
			</MemoryRouter>
		);

		// Check that Profile Page renders correctly
		expect(screen.getByText("Personal info")).toBeInTheDocument();
		expect(screen.getByText("Profile")).toBeInTheDocument();

		// Wait for redirect to Login
		await waitFor(() => screen.findAllByText("Login"));
	});

	test("Access Edit Profile from Profile Page", async () => {
		const data = {
			data: {
				id: 23,
				name: "Peter Pan",
				email: "johndoe@gmail.com",
				bio: "",
				phoneNumber: "01234567",
				image: "",
			},
		};

		MockedUserClient.onGet("/profile").reply(200, data);

		jest.spyOn(Helpers, "validateToken")
			.mockReturnValue(false)
			.mockReturnValueOnce(true)
            .mockReturnValueOnce(true);

		customRenderWithGoogleAuth(
			<MemoryRouter initialEntries={["/profile"]}>
				<App />
			</MemoryRouter>
		);

		// Check that Profile Page renders correctly
		expect(screen.getByText("Personal info")).toBeInTheDocument();
		expect(screen.getByText("Profile")).toBeInTheDocument();

        // Wait API call to get details
		await waitFor(() => screen.findAllByText("Peter Pan"));

		// User redirect to edit profile page
		userEvent.click(screen.getByRole("button"));

		// Check the Edit Profile page renders correctly
		expect(screen.getByText("Change Info")).toBeInTheDocument();
		expect(
			screen.getByText("Changes will be reflected to every services")
		).toBeInTheDocument();
		expect(screen.getByText("Name")).toBeInTheDocument();

        // Wait API call to get details on edit profile page
		await waitFor(() => screen.findAllByText("Peter Pan"));

		// Trying to mock all the flow in editing profile is looking unnecessary
	});
});
