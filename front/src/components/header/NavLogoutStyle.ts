import styled from "styled-components";

const NavLogoutStyle = styled.div`
  ul{
    ${({ theme }) => theme.common.flexCenter};
    justify-content: space-between;

    li{
      cursor: pointer;
      font-size: ${({ theme }) => theme.fontSize.text};
      a{
        color: ${({ theme }) => theme.colors.greyText};
      }

      &+li{
        margin-left: 20px;
      }
    }
  }
`;

export default NavLogoutStyle;