import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import * as S from "./MainStyle";
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
  const navigate = useNavigate();
  return (
    <MainBanner>
      <BannerContent>
        <BannerText>오늘도 근무 중인 당신에게,</BannerText>
        <BannerText>CHAIR COACH</BannerText>
        <BannerButton hover="true" onClick={(e) => navigate("/chaircoach")}>
          체어코치 하러가기
        </BannerButton>
      </BannerContent>
    </MainBanner>
  );
};

export default Banner;
