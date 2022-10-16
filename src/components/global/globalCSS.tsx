import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`    
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
}

body {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    background-color: hsl(0, 0%, 98%);
    color: hsl(234, 12%, 34%);
}

p {
    @media (max-width: 768px) {
    font-size: 14px;
  }
}

input {
    color: hsl(234, 12%, 34%);
}
`;

export const Main = styled.main`
	max-width: 80vw;
`;
