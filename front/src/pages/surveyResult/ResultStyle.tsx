import styled, { css } from "styled-components";

interface RecommendText {
  lineHeight?: boolean;
}

const resultContent = css`
  ${({ theme }) => theme.common.flexCenter};
  justify-content: space-between;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 4px;

  & > :last-child {
    margin-left: 40px;
  }
`;

export const ResultContainer = styled.div`
  ${({ theme }) => theme.common.contentMinLayout};
  ${({ theme }) => theme.common.flexCenter};
  background: ${({ theme }) => theme.colors.mainLight};

  .inner {
    padding: 120px 0;
    margin: 0 auto;
  }
`;

export const Title = styled.h3`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.title};
`;
export const SubTitle1 = styled.p`
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  line-height: 1.25;
`;
export const SubTitle2 = styled.p<RecommendText>`
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  text-align: center;
  line-height: ${({ lineHeight }) => lineHeight && 1.25};

  span {
    font-weight: 700;
  }
`;

// 거북목 자가진단
export const ResultBox = styled.div`
  ${resultContent}
  padding: 64px 136px;

  img {
    width: 160px;
  }
`;

// 거북목 AI 진단
export const InspectionResultWrap = styled.div`
  ${resultContent}
  padding: 64px 96px;

  img {
    width: 400px;
    height: 300px;
    background: #ccc;
  }
`;

export const PointText = styled.span`
  color: ${({ theme }) => theme.colors.main};
  font-weight: 700;
`;

export const RecommendBox = styled.div`
  margin: 40px auto 0 auto;
  padding: 64px 0;
  width: 600px;
  border-radius: 4px;
  background-color: #fff;
`;

export const BtnBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  margin-top: 64px;

  button + button {
    margin-left: 20px;
  }
`;
