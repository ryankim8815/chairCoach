import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'


const GlobalStyles = createGlobalStyle`
  ${reset}

  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap");
  
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

  a{
    text-decoration: none;
    color: #333;
  }

  span{display: inline-block}

  input, button{
    font-family: 'Noto Sans KR', sans-serif;
  }
  
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