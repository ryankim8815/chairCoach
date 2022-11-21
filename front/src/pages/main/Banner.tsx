import React from "react";
import styled from "styled-components";
import * as B from "../../styles/BtnStyle";
import bannerImg from "../../assets/image/main_banner.png";

const MainBanner = styled.div`
  height: 640px;
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
  flex-direction: column;
`;

const BannerContent = styled.div`
  max-width: 1180px;
  padding-top: 200px;
  &:last-child {
    text-align: right;
  }
`;
const BannerText = styled.div`
  width: 450px;
  //height: 120px;
  color: #333;
  font-weight: 500;
  font-size: 40px;
  text-align: right;
  margin-left: auto;
  margin-bottom: 20px;
`;

const BannerButton = styled(B.MiddleBtn)`
  //text-align: right;
  margin-top: 44px;
`;

const Banner = () => {
  return (
    <MainBanner>
      <BannerContent>
        <BannerText>
          오늘도 근무 중인 당신에게, <br />
        </BannerText>
        <BannerText>CHAIR COACH</BannerText>
        <BannerButton hover="true">체어코치 하러가기</BannerButton>
      </BannerContent>
    </MainBanner>
  );
};

export default Banner;
