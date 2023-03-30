import styled from "styled-components";

const StyledEditProfilePage = styled.div`
	h2 {
		font-size: 24px;
	}

	h4,
	p {
		font-size: 13px;
		color: #828282;
		font-weight: 500;
	}

	input {
		&::placeholder {
			font-size: 13px;
			color: #bdbdbd;
		}
	}

	p {
		color: #4f4f4f;
	}

	button {
		border: 1px solid #2f80ed;
		border-radius: 10px;
		color: #ffffff;
		background-color: #2f80ed;
		padding: 5px 20px;

		&:hover {
			opacity: 0.7;
		}
	}

	.profile-back {
		color: #2d9cdb;
		font-size: 18px;

		&:hover {
			opacity: 0.7;
		}
		svg {
			display: inline;
		}
	}

	.edit-form {
		border: 1px solid #e0e0e0;
		border-radius: 12px;

		.image-upload {
			position: relative;
			img {
				width: 72px;
				border-radius: 15px;
				opacity: 0.8;
			}

			svg {
				position: absolute;
				top: 25px;
				left: 22px;
				color: #ffffff;
				font-size: 24px;
			}

			input {
				width: 0.1px;
				height: 0.1px;
				opacity: 0;
				overflow: hidden;
				position: absolute;
				z-index: -1;
			}

			label {
				font-size: 13px;
				color: #828282;
				cursor: pointer;

				&:hover {
					opacity: 0.7;
				}
			}
		}
	}

	@media (max-width: 640px) {
		h2 {
			font-size: 20px;
		}

		.edit-form {
			border: none;
		}
	}
`;

export default StyledEditProfilePage;
