import styled from "styled-components";
import bannerImg from "../../assets/image/main_banner.png";

export interface MainStyledProps {
  height?: number;
  fontWeight?: number;
  fontSize?: number;
}

export const MainLayout = styled.div`
  width: 100%;
  background-color: aliceblue;
`;

export const MainBanner = styled.div`
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

export const BannerContent = styled.div`
  max-width: 1180px;
  padding-top: 200px;
`;
export const BannerText = styled.div`
  width: 450px;
  //height: 120px;
  color: #333;
  font-weight: 500;
  font-size: 40px;
  text-align: right;
  margin-left: auto;
  margin-bottom: 20px;
`;

export const BannerButton = styled.button`
  display: block;
  width: 192px;
  height: 48px;
  background-color: #403e56;
  color: #ffffff;
  margin: 60px 0 0 auto;
`;

export const ContentBox = styled.section<MainStyledProps>`
  max-width: 1180px;
  height: ${(props) => `${props.height}px`};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
`;

export const Logo = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 auto;
  //background-image: url();
  background-color: black;
  //background-size: cover;
  //background-repeat: no-repeat;
`;

export const Text = styled.div<MainStyledProps>`
  display: inline;
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => `${props.fontSize}px`};
`;
