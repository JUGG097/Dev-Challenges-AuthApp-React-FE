import styled from "styled-components";
import { numberToPixel } from "../utils/Helpers";

const StyledInputText = styled.div<{ inlineIcon: Boolean }>`
	position: relative;
	padding: 0;
	input {
		border: 1px solid #bdbdbd;
		border-radius: 8px;
		height: 48px;
		width: 100%;
		padding: 0 10px;
		padding-left: ${(props) =>
			props.inlineIcon ? numberToPixel(35) : numberToPixel(10)};

		&::placeholder {
			font-size: 16px;
			color: #828282;
		}
	}

	svg {
		position: absolute;
		top: 15px;
		left: 10px;
		color: #828282;
		font-size: 20px;
	}
`;

export default StyledInputText;
