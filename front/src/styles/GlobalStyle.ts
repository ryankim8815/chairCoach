import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'
import lock from "../assets/img/lock_icon.svg";

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

  .lock{
    position: relative;
    pointer-events: none;

    &::before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.colors.mainLight};
      opacity: .8;
    }

    &::after{
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 32px;
      transform: translate(-50%, -50%);
      background: url(${lock}) no-repeat center;
      background-size: contain;
      filter: invert(51%) sepia(95%) saturate(4443%) hue-rotate(234deg) brightness(99%) contrast(103%);
    }
    
  }
`;

export default GlobalStyles;