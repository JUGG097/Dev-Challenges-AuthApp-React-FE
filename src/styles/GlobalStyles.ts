import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        background: #FFFFFF;
        font-family: 'Noto Sans', sans-serif;
    }
    input::placeholder {
		color: #828282;
		font-size: 16px;
	}
`;
