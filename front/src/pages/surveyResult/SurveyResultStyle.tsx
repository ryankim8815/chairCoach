import styled from "styled-components";

export const ResultContainer = styled.div`
  ${({ theme }) => theme.common.contentMinLayout};
  ${({ theme }) => theme.common.flexCenter};
  background: ${({ theme }) => theme.colors.mainLight};
  flex-direction: column;
  .inner {
    ${({ theme }) => theme.common.inner};
    padding: 120px 0;
  }
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSize.title};
`;
export const SubTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.subTitle};
`;

export const TitleBox = styled.div`
  width: 800px;
  height: auto;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const ResultBox = styled.div`
  width: 800px;
  height: 280px;
  background-color: #ffffff;
  display: flex;
  margin-top: 20px;
`;

export const RecommendBox = styled.div`
  width: 600px;
  height: 270px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin-top: 40px;
  align-items: center;
  justify-content: space-evenly;
  margin: 40px auto;
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: center;
`;
export const HalfBox = styled.div`
  width: 400px;
  height: 280px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;
export const TextBox = styled.div`
  width: 262px;
  height: 105px;
  line-height: 1.25;
`;
export const Percent = styled.span`
  color: ${({ theme }) => theme.colors.main};
  font-weight: 600;
`;

export const IconImg = styled.img`
  width: 160px;
  height: 160px;
`;

export const BoldLetter = styled.span`
  font-weight: 600;
`;
