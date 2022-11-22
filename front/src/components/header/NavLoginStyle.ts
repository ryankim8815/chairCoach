import styled from "styled-components";

const NavLoginStyle = styled.div`
  position: relative;
  button{
    padding: 4px 8px;
    font-size: ${({ theme }) => theme.fontSize.text};
    svg{
      color: ${({ theme }) => theme.colors.greyText};
    }
  }

  ul{
    position: absolute;
    right: 0;
    top: 46px;
    padding: 8px 0;
    width: 120px;
    border: 1px solid ${({ theme }) => theme.colors.greyBorder};
    border-radius: 2px;
    background: #fff;

    li{
      padding: 8px 16px;
      a{
        font-size: ${({ theme }) => theme.fontSize.text};
        color: ${({ theme }) => theme.colors.greyText};
      }
    }
  }
`;

export default NavLoginStyle;