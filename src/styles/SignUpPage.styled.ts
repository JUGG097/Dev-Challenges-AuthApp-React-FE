import styled from "styled-components";

const StyledSignUpPage = styled.div`
	margin-top: 5%;
	position: relative;
	/* margin-bottom: 5%; */
	.wrapper-container {
		border-radius: 24px;
		border: 1px solid #bdbdbd;

		h4 {
			font-weight: 600;
			font-size: 18px;
			color: #333333;
			width: 80%;
		}

		p {
			color: #333333;
			font-size: 16px;
			font-weight: 400;
			width: 80%;
		}

		button {
			width: 100%;
			border-radius: 8px;
			background-color: #2f80ed;
			color: #fff;
			height: 40px;
		}

		.social-signup {
			p {
				font-size: 14px;
				color: #828282;
				width: 100%;
			}

			a {
				color: #2d9cdb;

				&:hover {
					opacity: 0.7;
				}
			}

			.media-icons {
				span {
					border: 1px solid #828282;
					color: #828282;
					border-radius: 50%;
					cursor: pointer;

					a {
						color: #828282;
					}
				}
			}
		}
	}

	@media (max-width: 640px) {
		margin-top: 2%;
		.wrapper-container {
			border: none;

			h4 {
				width: 100%;
			}

			p {
				width: 100%;
			}
		}
	}
`;

export default StyledSignUpPage;
