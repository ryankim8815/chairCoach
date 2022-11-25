import styled from "styled-components";
import aboutNeck1 from "../../assets/img/aboutneck1.png";
import aboutNeck2 from "../../assets/img/aboutneck2.png";
import aboutNeck3 from "../../assets/img/aboutneck3.png";

export const WholePage = styled.div`
  ${({ theme }) => theme.common.contentMinLayout};
  background: ${({ theme }) => theme.colors.mainLight};
  flex-direction: column;
  .inner {
    ${({ theme }) => theme.common.inner};
    padding: 120px 0;
  }
`;

export const TitleBox = styled.div`
  margin: 0 auto;
  text-align: center;
`;

export const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSize.title};
`;

export const SubTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  font-weight: 500;
`;
export const Text = styled.span`
  font-size: 16px;
  margin-top: 20px;
  line-height:1.25;
`;

export const Bold = styled.span`
  font-weight: 700;
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

export const SizedImg1 = styled.div`
  width: 50%;
  height: 264px;
  background-image: url(${aboutNeck1});
  background-size: cover;
  background-repeat: no-repeat;
`;
export const SizedImg2 = styled.div`
  width: 50%;
  height: 264px;
  background-image: url(${aboutNeck2});
  background-size: cover;
  background-repeat: no-repeat;
`;
export const SizedImg3 = styled.div`
  width: 50%;
  height: 264px;
  background-image: url(${aboutNeck3});
  background-size: cover;
  background-repeat: no-repeat;
`;

export const TextBox = styled.div`
  width: 50%;
  height: 264px;
  line-height: 1.25;
  padding:40px;
  background:#FFF;
  transition: all .3s;
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
