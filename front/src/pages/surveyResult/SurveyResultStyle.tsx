import styled from "styled-components";

export const ResultContainer = styled.div`
  ${({ theme }) => theme.common.contentMinLayout};
  ${({ theme }) => theme.common.flexCenter};
  background: ${({ theme }) => theme.colors.mainLight};

  .inner {
    padding: 120px 0;
    width: 800px;
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
export const SubTitle2 = styled.p`
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  text-align: center;
`;

export const ResultBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  justify-content: space-between;
  padding: 64px 120px;
  background-color: #ffffff;
  margin-top: 20px;
  border-radius: 4px;
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

  button + button{
    margin-left: 20px;
  }
`;

export const TextBox = styled.div`
  line-height: 1.25;
`;
export const Percent = styled.span`
  color: ${({ theme }) => theme.colors.main};
  font-weight: 700;
`;

export const IconImg = styled.img`
  width: 160px;
`;

export const BoldLetter = styled.span`
  font-weight: 700;
`;
