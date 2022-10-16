import * as S from "./styled";

function Button({ content, onClickHandler }) {
	return (
		<S.Button type="button" onClick={onClickHandler}>
			{content}
		</S.Button>
	);
}

export default Button;
