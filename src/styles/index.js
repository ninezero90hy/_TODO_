import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import '../assets/css/theme.css';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body, html {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: rgb(233, 236, 239);
  }
`;

export { GlobalStyle };
