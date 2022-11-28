import styled from "styled-components";

export const HeaderLayout = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyBorder};
  background: #fff;
  z-index: 10;

  .inner{
    ${({ theme }) => theme.common.flexCenter};
    justify-content: space-between;
    ${({ theme }) => theme.common.inner};
    height: 100%;

    .left{
      ${({ theme }) => theme.common.flexCenter};

      h1{
        cursor: pointer;
      }
    }
  }
`;

export const NavLayout = styled.nav`
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

export const LoginMenuCon = styled.div`
  position: relative;
  font-weight: 300;
  button{
    padding: 4px 8px;
    font-size: ${({ theme }) => theme.fontSize.text};
    span{
      font-weight: 500;
      color: #333;
    }

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

export const LogoutMenuCon = styled.div`
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