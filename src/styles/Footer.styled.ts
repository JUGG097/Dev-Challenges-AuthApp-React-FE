import styled from "styled-components";

const StyledFooter = styled.div`
	color: #828282;
	font-size: 14px;
	.footer-wrapper {
		p {
			margin: 0;
			padding: 0;
			width: 100%;
		}
	}

	@media (max-width: 640px) {
        /* position: absolute;
        bottom: 0; */
        width: 100%;
		.footer-wrapper {
			width: 100%;
			padding: 0 15px;
		}
	}
`;

export default StyledFooter;
