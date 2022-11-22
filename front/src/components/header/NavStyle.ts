import styled from "styled-components";

const NavStyle = styled.nav`
  margin-left: 40px;
      ul{
        ${({ theme }) => theme.common.flexCenter};
        justify-content: space-between;

        li{
          a{
            font-weight: 500;
            transition: all .3s;

            &:hover{
              color: ${({ theme }) => theme.colors.main};
            }
          }

          &+li{
            margin-left: 20px;
          }
        }
      }
`;

export default NavStyle;