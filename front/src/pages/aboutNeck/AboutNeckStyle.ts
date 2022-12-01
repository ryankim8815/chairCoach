import styled from "styled-components";
import aboutNeck1 from "../../assets/img/aboutneck1.png";
import aboutNeck2 from "../../assets/img/aboutneck2.png";
import aboutNeck3 from "../../assets/img/aboutneck3.png";

export const WholePage = styled.div`
  ${({ theme }) => theme.common.contentMinLayout};
  background: ${({ theme }) => theme.colors.mainLight};

  .inner {
    ${({ theme }) => theme.common.inner};
    padding: 120px 0;
  }
`;

export const TitleBox = styled.div`
  text-align: center;
`;

export const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSize.title};
  margin-bottom: 40px;
`;

export const SubTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  font-weight: 500;
`;
export const Text = styled.span`
  margin-top: 20px;
  line-height:1.25;
`;

export const Bold = styled.span`
  font-weight: 700;
`;

export const MainContents = styled.div`
  margin: 0 auto;
  width: 960px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.mainMoreLight};
  overflow: hidden;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: 264px;
`;

export const SizedImg1 = styled.div`
  background-image: url(${aboutNeck1});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
export const SizedImg2 = styled.div`
  background-image: url(${aboutNeck2});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
export const SizedImg3 = styled.div`
  background-image: url(${aboutNeck3});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const TextBox = styled.div`
  line-height: 1.25;
  padding:40px;
`;

export const TextList = styled.ul`
  margin-bottom: 4px;
  li{
    position: relative;
    padding-left: 12px;

    &+li{
      margin-top: 4px;
    }
  }

  li::before{
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #333;
  }
`;

export const ChioceBox = styled.div`
  margin-top: 120px;
`;
export const BtnBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 40px;
`;
export const ChoiceBtn = styled.div`
  padding: 32px 40px;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  transition: all .3s;

  p{
    margin-top: 20px;
    line-height: 1.25;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.main};
    color: #ffffff;
  }
`;
