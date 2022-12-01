// PASSWORD: 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

// NICKNAME: 한글+숫자 2~8 | 영어+숫자 2~12 - FE에서 보여지는 길이 기준
const nickname = /^([가-힣0-9]{2,8}|[A-Za-z0-9]{2,12})$/;

// CODE for verifying email: 4자리 숫자
const emailCode = /^[0-9]{4,4}$/;

// IMAGE FILENAME for multer
// const imageFiltename = /^[\\S]+(\\.(png|jpg|jpeg|gif))$/;
// const imageFiltename = /^[가-힣A-Za-z0-9\_]+\.(png|jpg|jpeg|gif)$/; // 한국어?!
const imageFiltename = /^[가-힣|A-Z|a-z|0-9|\_]+\.(png|jpg|jpeg|gif)$/; // 한국어?!

export { password, nickname, emailCode, imageFiltename };
