import styled from "styled-components";

export const WholePage = styled.div`
  height: 1550px;
  width: 100%;
  background: ${({ theme }) => theme.colors.mainLight};
  display: flex;
  flex-direction: column;
`;

export const TitleBox = styled.div`
  margin: 184px auto 0 auto;
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSize.title};
`;

export const SubTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  font-weight: 500;
`;
export const Text = styled.span`
  font-size: ${({ theme }) => theme.fontSize.text};
  margin-top: 20px;
`;

export const Bold = styled.span`
  font-weight: 600;
`;

export const MainContents = styled.div`
  width: 960px;
  height: 792px;
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  background-color: #ffffff;
`;

export const Content = styled.div`
  width: 960px;
  height: 264px;
  display: flex;
`;

export const SizedImg = styled.img`
  width: 480px;
  height: 264px;
`;

export const TextBox = styled.div`
  width: 480px;
  height: 264px;
  line-height: 1.25;
  margin-left: 30px;
  margin-top: 30px;
`;

export const ChioceBox = styled.div`
  width: 1180px;
  height: 234px;
  display: flex;
  flex-direction: column;
  margin: 120px auto 0 auto;
`;
export const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ChoiceBtn = styled.div`
  width: 570px;
  height: 156px;
  margin-top: 20px;
  background: ${({ theme }) => theme.colors.greyBtnBg};
  &:hover {
    background: ${({ theme }) => theme.colors.main};
    color: #ffffff;
  }
`;
export const BtnText = styled.div`
  margin: 20px auto auto 40px;
`;
