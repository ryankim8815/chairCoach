import styled from "styled-components";

export const SurveyContainer = styled.div`
  ${({ theme }) => theme.common.contentMinLayout};
  ${({ theme }) => theme.common.flexCenter};
  background: ${({ theme }) => theme.colors.mainLight};

  .inner {
    width: 800px;
    margin: 0 auto;
    padding: 120px 0;
  }
`;

export const ContentBox = styled.div`
  padding: 64px 0;
  border-radius: 4px;
  background-color: #fff;
  text-align: center;
`;

export const TitleBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  justify-content: space-between;
  font-weight: 700;
  margin-bottom: 40px;
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: 500;
`;
export const SubTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.subTitle};
`;

export const Page = styled.span`
  color: ${({ theme }) => theme.colors.main};
  font-weight: 600;
`;

export const Img = styled.img`
  margin: 48px 0;
  width: 100%;
  height: 240px;
  object-fit: contain;
`;

export const BtnWrap = styled.div`
  button + button{
    margin-top: 16px;
  }
`;
