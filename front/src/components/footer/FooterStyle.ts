import styled from "styled-components";

export const FooterLayout = styled.footer`
  padding-bottom: 80px;
  background: ${({ theme }) => theme.colors.mainDark};

  .inner{
    ${({ theme }) => theme.common.inner};
  }
`;

export const TopCon = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #666;

  h1 img{
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(132deg) brightness(103%) contrast(103%);
    cursor: pointer;
  }

  ul{
    ${({ theme }) => theme.common.flexCenter};
    li{
      &+li{
        margin-left: 20px;
      }
      a{
        font-size: ${({ theme }) => theme.fontSize.text};
        color: ${({ theme }) => theme.colors.greyText};
      }
    }
  }
`;

export const CopyRightText = styled.p`
  margin-top: 16px;
  font-weight: 300;
  font-size: ${({ theme }) => theme.fontSize.text};
  color: ${({ theme }) => theme.colors.greyText};
`;