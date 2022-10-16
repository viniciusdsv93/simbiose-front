import styled from "styled-components";

export const Header = styled.header`
	width: 100%;
	height: 120px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;

	h1 {
		font-weight: 200;
		font-size: 25px;
	}

	h1 {
		@media (max-width: 768px) {
			font-size: 18px;
		}
	}

	h1 span {
		font-weight: 600;
	}
`;
