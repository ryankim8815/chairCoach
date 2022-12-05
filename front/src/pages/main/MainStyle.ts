import styled, { css } from "styled-components";
import bannerImg from "../../assets/img/main_banner.jpg";
import illustration from "../../assets/img/main_illustration.png";
import explainImg1 from "../../assets/img/explain_img1.jpg";
import explainImg2 from "../../assets/img/explain_img2.jpg";
import explainImg3 from "../../assets/img/explain_img3.jpg";
import stretching from "../../assets/img/main_stretching.png";
import neck from "../../assets/img/main_neck.png";

export interface MainStyledProps {
  height?: number;
  fontWeight?: number;
  fontSize?: number;
  lineHeight?: boolean;
}

const animationBefore = css`
  transform: translateY(30px);
  opacity: 0;
`;

const animationAfter = css`
  transform: translateY(0);
  opacity: 1;
`;

export const MainLayout = styled.main`
  section + section{
    padding: 120px 0;
  }

  section .inner{
    ${({ theme }) => theme.common.inner};
  }
`;

// 공용 타이틀텍스트
export const TitleText = styled.h2<MainStyledProps>`
  font-size: ${({ theme }) => theme.fontSize.title};
  line-height: ${({ lineHeight }) => lineHeight && 1.25};
  text-align: center;

  span{
    font-weight: 700;
  }

  ${animationBefore}
`;

// 베너
export const MainBanner = styled.section`
  position: relative;
  height: 640px;
  background: linear-gradient(
    to right,
    rgba(246, 246, 247, 1) 0%,
    rgba(246, 246, 247, 1) 49%,
    rgba(196, 176, 253, 1) 51%,
    rgba(196, 176, 253, 1) 100%
  );
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 2000px;
    height: 640px;
    background: url(${bannerImg}) no-repeat center;
    background-size: contain;
  }

  .inner{
    position: relative;
    ${({ theme }) => theme.common.inner};
  }
`;

export const BannerContent = styled.div`
  margin-top: 160px;
  text-align: right;

  h2{
    margin-bottom: 64px;
    font-weight: 500;
    font-size: 40px;
    line-height: 1.25;

    transition: all .5s;
    ${animationBefore}

    span{
      font-weight: 700;
    }
  }

  button{
    transition: all .5s .2s;
    ${animationBefore}
  }

  &.active{
    h2, button{
      ${animationAfter}
    }
  }
`;


// Introduce
export const IntroduceLayout = styled.section`
  h2{ transition: all .5s;}
  & > div{ transition: all .5s .2s; }
  p{ transition: all .5s 1s; }

  &.active{
    h2, &>div, p{
      ${animationAfter}
    }
  }
`;


export const IntroduceImage = styled.div`
  width: 100%;
  height: 320px;
  margin: 80px 0 40px 0;
  background: url(${illustration}) no-repeat center;
  background-size: contain;

  ${animationBefore}
`;

export const IntroduceText = styled.p`
  font-size: 20px;
  line-height: 1.25;
  text-align: center;
  span{
    font-weight: 700;
  }

  ${animationBefore}
`;

// ImportantText
export const ImportantTextLayout = styled.section`
  background: ${({ theme }) => theme.colors.greyBtnBg};
  h2{
    ${animationAfter}
  }
`;


// ExplainLayout
export const ExplainLayout = styled.section`
  margin: 240px 0;
  .inner > div + div{
    margin-top: 480px;
  }
`;

export const ExplainContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 400px;

  & > div:first-of-type{
    padding-top: 40px;
  }

  &:nth-child(2n){
    & > div:first-of-type{
      order: 2;
      justify-items: end;
      text-align: right;
    }
  }


  // 애니메이션 설정
  & > div:first-of-type{
    ${animationBefore}
    transition: all .5s;
  }

  & > div:last-of-type{
    ${animationBefore}
    transition: all .5s .3s;
  }
  
  &.active{
    & > div:first-of-type{
      ${animationAfter}
    }
  
    & > div:last-of-type{
      ${animationAfter}
    }
  } 
`;

export const ExplainTextWrap = styled.div`
  p{
    font-weight: 700;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.main};
  }

  h3{
    margin-top: 20px;
    font-size: 28px;
    line-height: 1.25;
  }
`;

const explainImg = css`
  background-size: cover;
  border-radius: 4px;
  overflow: hidden;
`;

export const ExplainImage1 = styled.div`
  background: url(${explainImg1}) no-repeat center;
  ${explainImg}
`;

export const ExplainImage2 = styled.div`
  background: url(${explainImg2}) no-repeat center;
  ${explainImg}
`;

export const ExplainImage3 = styled.div`
  background: url(${explainImg3}) no-repeat center;
  ${explainImg}
`;


// SelectLayout
export const SelectLayout = styled.section`
  background: ${({ theme }) => theme.colors.mainLight};

  // 애니메이션
  .inner{
    & > div:first-of-type{
      ${animationBefore}
      transition: all .5s;
    }
  
    & > div:last-of-type{
      ${animationBefore}
      transition: all .5s .3s;
    }
  }

  &.active .inner{
    & > div, h2{
      ${animationAfter}
    }
  }
`;


export const SelectContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 40px;
  margin-top: 64px;
  border-radius: 4px;
`;

export const SelectWrap = styled.div`
  display: grid;
  align-items: flex-end;
  height: 400px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  
  &.stretching{
    background: url(${stretching}) no-repeat top center;
    background-size: contain;
  }

  &.neck{
    background: url(${neck}) no-repeat top center;
    background-size: contain;
  }

  dl{
    padding: 32px 40px;
    border-radius: 4px;
    background: #fff;
    transition: all .3s;

    dt{
      margin-bottom: 20px;
      h3{
        font-weight: 500;
        font-size: ${({ theme }) => theme.fontSize.subTitle};
      }
    }

    dd p{
      line-height: 1.25;
    }
  }

  &:hover dl{
    background: ${({ theme }) => theme.colors.main};
    color: #fff;
  }
`;
