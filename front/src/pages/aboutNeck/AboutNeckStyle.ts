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

    h2{
      font-size: ${({ theme }) => theme.fontSize.title};
      margin-bottom: 40px;
    }
  }
`;

export const SubTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  font-weight: 500;
`;

export const Text = styled.p`
  margin-top: 20px;
  line-height:1.25;
  span{
    font-weight: 700;
  }
`;

// 거북목 증후군에 대해 알아보아요.
export const neckInfoBox = styled.div`
  h2{
    text-align: center;
    span{
      font-weight: 700;
    }
  }
`;

export const MainContents = styled.div`
  margin: 0 auto;
  width: 960px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.mainMoreLight};
  overflow: hidden;

  & > div:nth-child(2n) > div:first-of-type{
    order: 2;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: 264px;

  & > div:last-of-type{
    padding: 40px;
  }
`;

export const SizedImg1 = styled.div`
  background: url(${aboutNeck1}) no-repeat center;
  background-size: cover;
`;
export const SizedImg2 = styled.div`
  background: url(${aboutNeck2}) no-repeat center;
  background-size: cover;
`;
export const SizedImg3 = styled.div`
  background: url(${aboutNeck3}) no-repeat center;
  background-size: cover;
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

// 거북목 진단
export const ChioceBox = styled.div`
  margin-top: 120px;
  h2{
    font-weight: 700;
  }
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
    transform: translateY(-6px);
  }
`;
