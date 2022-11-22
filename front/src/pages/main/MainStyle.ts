import styled from "styled-components";

export interface MainStyledProps {
  height?: number;
  fontWeight?: number;
  fontSize?: number;
  lineHeight?: number;
}

export const MainLayout = styled.div`
  width: 100%;
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
  line-height: ${(props) => `${props.lineHeight}px`};
`;
