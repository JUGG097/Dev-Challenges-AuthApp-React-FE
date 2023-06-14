import {
	cleanup,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import * as Helpers from "../utils/Helpers";
import {MockedAuthClient, MockedUserClient, customRenderWithGoogleAuth } from "./TestHelpers";


describe("Login Workflow", () => {
	beforeEach(() => {
		MockedAuthClient.reset();
	});
	afterEach(cleanup);

	test("Login Success Flow", async () => {
		const data = {
			data: {
				authToken: "qwertytoken",
				refreshToken: "qwerty",
			},
		};

		const data_2 = {
			data: {
				id: 23,
				name: "Peter Pan",
				email: "johndoe@gmail.com",
				bio: "",
				phoneNumber: "01234567",
				image: "",
			},
		};

		MockedAuthClient.onPost("/login").reply(200, data);
		MockedUserClient.onGet("/profile").reply(200, data_2);

		// This part of the test is sensitive to the protected route function
		jest.spyOn(Helpers, "validateToken")
			.mockReturnValue(true)
			.mockReturnValueOnce(false)
			.mockReturnValueOnce(false)

		customRenderWithGoogleAuth(
			<MemoryRouter initialEntries={["/login"]}>
				<App />
			</MemoryRouter>
		);

		// Check that Login Page renders correctly
		expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();

		// Similar User entering credentials
		userEvent.type(
			screen.getByPlaceholderText("Email"),
			"johndoe@gmail.com"
		);
		userEvent.type(screen.getByPlaceholderText("Password"), "qwerty");
		userEvent.click(screen.getByRole("button"));

		expect(
			await screen.findByText("Verifying Credentials")
		).toBeInTheDocument();

		expect(
			await screen.findByText(
				"Authentication successful, redirecting to profile page"
			)
		).toBeInTheDocument();

		await waitForElementToBeRemoved(() => screen.queryByText("Verifying Credentials"))

		// Wait for redirect to Profile Page
		await waitFor(() => screen.findByText("Personal info"));

		// Wait API call to get details
		await waitFor(() => screen.findAllByText("Peter Pan"));

	});

	test("Login Failed Flow", async () => {
		
		MockedAuthClient.onPost("/login").reply(400);

		customRenderWithGoogleAuth(
			<MemoryRouter initialEntries={["/login"]}>
				<App />
			</MemoryRouter>
		);

		// Check that Login Page renders correctly
		expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();

		// Simulate user entering credentials
		userEvent.type(
			screen.getByPlaceholderText("Email"),
			"johndoe@gmail.com"
		);
		userEvent.type(screen.getByPlaceholderText("Password"), "qwerty");
		userEvent.click(screen.getByRole("button"));
	
		expect(
			await screen.findByText("Verifying Credentials")
		).toBeInTheDocument();

		expect(
			await screen.findByText(/Authentication failed:/i)
		).toBeInTheDocument();

		expect(
			screen.queryByText("Verifying Credentials")
		).not.toBeInTheDocument();
	})
});
