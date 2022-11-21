import { DefaultTheme } from "styled-components";

const colors = {
  // mainColor
  main: '#835DFE',
  mainLight: '#F1EDFC', // 페이지bg
  mainMoreLight: '#FAF9FF', // 컨포넌트 밝은 보라 bg
  mainDark: '#403E56', // footer, 어두운버튼

  // grey
  greyText: '#999', // 회색폰트
  greyBorder: '#e1e1e1', // 회색보더
  greyBtnBg: '#F6F6F7', // 회색버튼배경

  // the rest
  warning: '#E57683', // input경고
};

const fontSize = {
  title: 32, // 메인타이틀
  subTitle: 24, // 박스안의 제목들
  text: 15,
};

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;

const theme: DefaultTheme = {
  colors,
  fontSize,
};

export default theme;