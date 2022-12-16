import styled, { css } from "styled-components";

const positionCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const positionLeftCenter = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
  position: relative;

  .startTitle {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    background: #31303a;
  }
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
export const AnswerTextWrap = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  margin-top: 24px;
  height: 60px;

  p {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.subTitle};
    color: #ff0000;
    line-height: 1.25;
  }
`;

export const MiddleContent = styled.div`
  position: relative;
  ${({ theme }) => theme.common.flexCenter};
`;

export const LeftContent = styled.div`
  display: grid;
  align-content: space-between;
  margin-right: 20px;
  height: 480px;
`;

export const StretchingStartWrap = styled.div`
  & > * {
    margin-bottom: 60px;
  }

  .timer {
    display: block;
    width: 100%;
    font-weight: 700;
    font-size: 100px;
    color: ${({ theme }) => theme.colors.main};
    text-align: center;
  }
`;

export const CanvasContent = styled.div`
  position: relative;
`;

export const ReadyGuide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 640px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;

  & > img {
    ${positionLeftCenter}
    bottom: 20px;
    height: 340px;
  }

  & > p {
    ${positionLeftCenter}
    bottom: 12px;
    padding: 12px;
    width: 480px;
    border-radius: 2px;
    background: rgba(225, 225, 225, 0.7);
    backdrop-filter: saturate(180%) blur(5px);
    font-weight: 500;
    color: ${({ theme }) => theme.colors.main};
    text-align: center;
  }
`;

export const VideoContent = styled.div`
  video {
    width: 400px;
  }

  span {
    display: block;
    margin-top: 16px;
    text-align: center;
    color: #fff;
  }
`;

export const btnWrap = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  margin-top: 24px;
  height: 48px;

  button + button {
    margin-left: 20px;
  }

  p {
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSize.title};
    color: #fc4566;
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
