import React from "react";
import styled from "styled-components";
import * as S from "./MainStyle";
import * as B from "../../styles/BtnStyle";
// import bannerImg from "../../assets/image/main_banner.png";
import bannerImg from "../../assets/image/main_banner.jpg";

const MainBanner = styled.div`
  /* height: 640px;
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(241, 237, 252, 0) 30%,
      rgba(194, 172, 255, 1) 100%
    ),
    url(${bannerImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  display: flex;
  flex-direction: column; */

  position: relative;
  height: 640px;
  background: linear-gradient(90deg, rgba(246,246,247,1) 0%, rgba(246,246,247,1) 49%, rgba(196,176,253,1) 51%, rgba(196,176,253,1) 100%);
  overflow: hidden;

  & > div{
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 2000px;
    height: 640px;
    background: url(${bannerImg}) no-repeat center;
    background-size: contain;
  }
`;

const BannerContent = styled.div`
  width: 1180px;
  padding-top: 200px;
  margin: 0 auto;
`;
const BannerText = styled(S.MediumText)`
  margin-bottom: 20px;
`;

const BannerButton = styled(B.MiddleBtn)`
  margin-top: 44px;
  float: right;
`;

const Banner = () => {
  return (
    <MainBanner>
      <div>
        <BannerContent>
          <BannerText>오늘도 근무 중인 당신에게,</BannerText>
          <BannerText>CHAIR COACH</BannerText>
          <BannerButton hover="true">체어코치 하러가기</BannerButton>
        </BannerContent>
      </div>
    </MainBanner>
  );
};

export default Banner;
