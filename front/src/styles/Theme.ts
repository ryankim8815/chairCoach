import { DefaultTheme } from "styled-components";

const colors = {
  // mainColor
  main: "#835DFE",
  mainLight: "#F1EDFC", // 페이지bg
  mainMoreLight: "#FAF9FF", // 컨포넌트 밝은 보라 bg
  mainDark: "#403E56", // footer, 어두운버튼

  // grey
  greyText: "#999", // 회색폰트
  greyBorder: "#e1e1e1", // 회색보더
  greyBtnBg: "#F6F6F7", // 회색버튼배경

  // the rest
  warning: "#E57683", // input경고
};

const fontSize = {
  title: '32px', // 메인타이틀
  subTitle: '24px', // 박스안의 제목들
  text: '15px',
};

const common = {
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
};

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;
export type CommonTypes = typeof common;

const theme: DefaultTheme = {
  colors,
  fontSize,
  common,
};

export default theme;
