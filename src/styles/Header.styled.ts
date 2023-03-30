import styled from "styled-components";

const StyledHeader = styled.div`
	position: relative;

	.cta-dropdown-wrapper {
		color: #333333;
		font-weight: 700;
		font-size: 12px;
		cursor: pointer;

        &:hover {
			opacity: 0.7;
		}

		img {
			width: 20px;
			border-radius: 5px;
		}
	}

	.dropdown-menu {
		border: 1px solid #e0e0e0;
		border-radius: 10px;
		width: 160px;
		font-weight: 500;
		color: #4f4f4f;
		font-size: 12px;
		position: absolute;
		right: 20px;
		top: 50px;
		background: white;
		z-index: 99;

		svg {
			font-size: 22px;
		}

		.profile:hover {
			opacity: 0.7;
		}

		.logout {
			border-top: 1px solid #e0e0e0;
			color: #eb5757;
			cursor: pointer;

			&:hover {
				opacity: 0.7;
			}
		}
	}

	@media (max-width: 468px) {
		.cta-dropdown-wrapper {
			span {
				display: none;
			}
		}
	}
`;

export default StyledHeader;
