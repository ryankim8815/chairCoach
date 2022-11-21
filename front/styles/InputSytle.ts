import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
    outline: none;
  }
  
  body{
    color: #333;
    line-height: 1;
    letter-spacing: -0.0125em;
    font-family: 'Noto Sans KR', sans-serif;
  }

  span{display: inline-block}
  
  button{
    padding: 0;
    background: transparent;
    border: 0;
    font-size: 16px;
    cursor: pointer;
  }

  svg{
    display: inline-block;
    vertical-align: middle;
  }
`;

export default GlobalStyles;