import styled from "styled-components";

import googleIcon from "../../assets/img/googleIcon.png";
import kakaoIcon from "../../assets/img/kakaoIcon.png";
import naverIcon from "../../assets/img/naverIcon.png";

export const LoginLayout = styled.div`
  ${({ theme }) => theme.common.contentMinLayout};
  ${({ theme }) => theme.common.flexCenter};

  .inner {
    width: 800px;
    margin: 0 auto;
    padding: 120px 0;
  }
`;

export const TopCon = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  flex-direction: column;
  padding-bottom: 40px;

  img {
    height: 28px;
  }

  form {
    margin-top: 40px;

    input:last-of-type {
      margin-top: 8px;
    }

    button {
      margin-top: 64px;
    }
  }
`;

export const BottomCon = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  flex-direction: column;
  padding-top: 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.greyBorder};

  p {
    margin-bottom: 20px;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.greyText};
  }

  ul {
    ${({ theme }) => theme.common.flexCenter};
    margin-bottom: 64px;

    li {
      text-align: center;

      & + li {
        margin-left: 16px;
      }

      &:nth-child(1) a {
        background: url(${googleIcon}) no-repeat center;
        background-size: contain;
      }
      &:nth-child(2) a {
        background: url(${kakaoIcon}) no-repeat center;
        background-size: contain;
      }
      &:nth-child(3) a {
        background: url(${naverIcon}) no-repeat center;
        background-size: contain;
      }

      a {
        display: block;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        text-indent: -9999px;
      }

      span {
        display: block;
        margin-top: 8px;
        font-weight: 300;
        font-size: ${({ theme }) => theme.fontSize.text};
        color: ${({ theme }) => theme.colors.greyText};
      }
    }
  }
`;
