import React from "react";
import StyledInputText from "../styles/InputText.styled";

const InputText: React.FC<{
	holder_text: string;
	icon?: JSX.Element;
	inlineIcon: Boolean;
	id: string;
	value: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
}> = ({ holder_text, icon, inlineIcon, id, value, handleChange, type }) => {
	return (
		<StyledInputText inlineIcon={inlineIcon}>
			{inlineIcon && icon}
			<input
				type={type ? type : "text"}
				name={id}
				id={id}
				placeholder={holder_text}
				onChange={handleChange}
				value={value}
			/>
		</StyledInputText>
	);
};

export default InputText;
