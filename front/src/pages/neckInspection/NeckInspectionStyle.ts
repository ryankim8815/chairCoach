import styled, { css } from "styled-components";

const positionCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const InspectionLayout = styled.div`
  position: fixed;
  width: 100%;
  height: calc(100vh - 64px);
  background: #31303a;
  overflow: hidden;
  z-index: 10;
`;

export const MainCont = styled.div`
  ${positionCenter}
`;

export const GuideTextWrap = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  margin-bottom: 24px;
  height: 60px;

  p {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.subTitle};
    color: #fff;
    line-height: 1.25;
  }
`;

export const MiddleContent = styled.div`
  position: relative;
`;

export const ImgCont = styled.div`
  position: absolute;
  top: 0;
  left: -260px;

  img {
    width: 240px;
  }

  span {
    display: block;
    margin-top: 16px;
    text-align: center;
    color: #fff;
  }
`;

export const TimeText = styled.p`
  ${positionCenter}
  font-weight: 700;
  font-size: 120px;
  color: ${({ theme }) => theme.colors.main};
  z-index: 10;
`;

export const btnWrap = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  margin-top: 24px;
  height: 48px;

  button + button {
    margin-left: 20px;
  }
`;

export const FinisheContent = styled.div`
  ${positionCenter}
  ${({ theme }) => theme.common.flexCenter};
  width: 100%;
  height: 100%;
  background: #31303a;

  & > div {
    img {
      width: 100%;
      height: 200px;
      object-fit: contain;
    }

    p {
      margin: 24px 0 120px 0;
      text-align: center;
      font-weight: 500;
      font-size: ${({ theme }) => theme.fontSize.title};
      color: #fff;
    }
  }
`;
