import styled, { css } from "styled-components";
import googleIcon from "../../assets/img/googleIcon.png";
import kakaoIcon from "../../assets/img/kakaoIcon.png";
import naverIcon from "../../assets/img/naverIcon.png";
import registerImg from "../../assets/img/registerImg.jpg";

const smallTitle = css`
  margin-bottom: 20px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.greyText};
`;

export const RegisterLayout = styled.div`
  ${({ theme }) => theme.common.contentMinLayout};
  ${({ theme }) => theme.common.flexCenter};

  .inner {
    ${({ theme }) => theme.common.inner};
    width: 1180px;
    display: grid;
    grid-template-columns: 6fr 4fr;
    gap: 40px;
    padding: 120px 0;
  }
`;

export const LeftCon = styled.div`
  padding: 0 64px;
  border: 1px solid ${({ theme }) => theme.colors.greyBorder};
  border-radius: 2px;
`;

export const TopWrap = styled.div`
  padding: 40px 0;
  p {
    ${smallTitle}
  }

  h2 {
    margin-bottom: 64px;
    font-size: ${({ theme }) => theme.fontSize.title};
    span {
      font-weight: 700;
      line-height: 1.25;
    }
  }
`;

export const BottomWrap = styled.div`
  padding: 40px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.greyBorder};

  p {
    ${smallTitle}
  }

  ul {
    ${({ theme }) => theme.common.flexCenter};
    justify-content: inherit;
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

  .loginText {
    font-weight: 400;
    a {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.main};
    }
  }
`;

export const RightCon = styled.div`
  border-radius: 2px;
  background: url(${registerImg}) no-repeat center;
  background-size: cover;
  text-indent: -9999px;
`;
