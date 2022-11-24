import styled from "styled-components";

export const SurveyContainer = styled.div`
${({ theme }) => theme.common.contentMinLayout};
${({ theme }) => theme.common.flexCenter};
  background: ${({ theme }) => theme.colors.mainLight};
  flex-direction: column;
  .inner {
    ${({ theme }) => theme.common.inner};
    padding: 120px 0;
`;

export const ContentBox = styled.div`
  width: 800px;
  height: 588px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleBox = styled.div`
  width: 800px;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: 500;
`;
export const SubTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  font-weight: 500;
`;

export const Page = styled.span`
  font-size: ${({ theme }) => theme.fontSize.text};
  font-weight: 600;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 459px;
  height: auto;
  margin-top: 40px;
`;

export const Img = styled.img`
  width: 320px;
  height: 240px;
  margin-top: 40px;
  border: none;
`;

export const Btn = styled.button`
  width: 440px;
  height: 48px;
  background: ${({ theme }) => theme.colors.greyBtnBg};
  margin-top: 48px;
  &:hover {
    background: ${({ theme }) => theme.colors.main};
  }
`;
