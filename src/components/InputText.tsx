import React from "react";
import StyledInputText from "../styles/InputText.styled";

const InputText: React.FC<{
	holder_text: string;
	icon?: JSX.Element;
	inlineIcon: Boolean;
	id: string;
}> = ({ holder_text, icon, inlineIcon, id }) => {
	return  (
		<StyledInputText inlineIcon={inlineIcon}>
			{inlineIcon && icon}
			<input type="text" name={id} id={id} placeholder={holder_text} />
		</StyledInputText>
	)
};

export default InputText;
